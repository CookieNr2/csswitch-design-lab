import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { isValidObjectId, type Types } from "mongoose";
import type { AuthenticatedUser } from "@/lib/server/auth";
import { getColorLookup } from "@/lib/server/catalog";
import { connectToDatabase } from "@/lib/server/db";
import { toPartColors, toSavedConfig, type ColorRecord } from "@/lib/server/dto";
import { OrderModel } from "@/lib/server/models/order";
import { SwitchConfigModel } from "@/lib/server/models/switch-config";
import { PART_NAMES, type PartColors, type PartName, type SavedConfig } from "@/lib/types";

/** Writing a design refreshes the popular galleries through this tag. */
export const CONFIGS_TAG = "configs";

export type ConfigInput = { name?: string; colors: Record<PartName, string> };

/** Populates every part's colour in one go. */
const PART_PATHS = PART_NAMES.join(" ");

/**
 * Distinct color combinations ordered by how often they have been saved.
 * `limit` of 0 means "all of them" (the inspiration gallery).
 */
export const getPopularConfigs = async (limit = 6): Promise<PartColors[]> => {
  "use cache";
  cacheTag(CONFIGS_TAG);
  cacheLife("minutes");

  await connectToDatabase();

  const grouped = await SwitchConfigModel.aggregate<{
    _id: Record<PartName, Types.ObjectId>;
    count: number;
  }>([
    {
      $group: {
        _id: Object.fromEntries(PART_NAMES.map((part) => [part, `$${part}`])),
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    ...(limit > 0 ? [{ $limit: limit }] : []),
  ]);

  const colors = await getColorLookup();
  return grouped
    .map((group) => toPartColors(group._id, (id) => colors.get(String(id))))
    .filter((config): config is PartColors => config !== null);
};

/** The user's own designs, newest first. */
export const getUserConfigs = async (user: AuthenticatedUser): Promise<SavedConfig[]> => {
  await connectToDatabase();

  const configs = await SwitchConfigModel.find({ owner: user._id })
    .populate<Record<PartName, ColorRecord | null>>(PART_PATHS)
    .sort({ updatedAt: -1 })
    .lean();

  return configs
    .map((config) => toSavedConfig(config))
    .filter((config): config is SavedConfig => config !== null);
};

/** One of the user's own designs. Anyone else's id reads as not found. */
export const getUserConfig = async (
  user: AuthenticatedUser,
  configId: string
): Promise<SavedConfig | null> => {
  if (!isValidObjectId(configId)) return null;
  await connectToDatabase();

  const config = await SwitchConfigModel.findOne({ _id: configId, owner: user._id })
    .populate<Record<PartName, ColorRecord | null>>(PART_PATHS)
    .lean();

  return config && toSavedConfig(config);
};

/** An unsaved design, so placeOrder can validate it together with its order. */
export const buildConfig = (owner: AuthenticatedUser | null, input: ConfigInput) =>
  new SwitchConfigModel({
    ...input.colors,
    name: input.name?.trim() || "New config",
    owner: owner?._id ?? null,
  });

/** Anonymous designs (owner null) are allowed: a design can be ordered without an account. */
export const createConfig = async (owner: AuthenticatedUser | null, input: ConfigInput) => {
  await connectToDatabase();
  const config = await buildConfig(owner, input).save();
  return String(config._id);
};

export const updateConfig = async (
  user: AuthenticatedUser,
  configId: string,
  input: { name?: string; colors?: Record<PartName, string> }
) => {
  if (!isValidObjectId(configId)) return false;
  await connectToDatabase();

  const updated = await SwitchConfigModel.findOneAndUpdate(
    { _id: configId, owner: user._id },
    {
      ...(input.colors ?? {}),
      ...(input.name !== undefined ? { name: input.name } : {}),
    },
    { runValidators: true, returnDocument: "after" }
  ).lean();

  return updated !== null;
};

/**
 * Takes the matching designs away from their owner. A design an order points
 * at is kept, without an owner, so the order still records what was bought;
 * the rest are deleted. Every step can be repeated safely if a later one fails.
 * Returns how many designs matched.
 */
const releaseConfigs = async (filter: { owner: string; _id?: string }) => {
  // InferSchemaType leaves out _id, so Mongoose cannot type it; it is always an ObjectId.
  const ids = (await SwitchConfigModel.distinct("_id", filter)) as Types.ObjectId[];
  if (ids.length === 0) return 0;

  const ordered = await OrderModel.distinct("switchConfig", { switchConfig: { $in: ids } });
  await SwitchConfigModel.deleteMany({ _id: { $in: ids, $nin: ordered } });
  await SwitchConfigModel.updateMany({ _id: { $in: ordered } }, { owner: null });
  return ids.length;
};

/** Removes one design from the user's list. False if they do not own it. */
export const deleteConfig = async (user: AuthenticatedUser, configId: string) => {
  // A malformed id would otherwise surface as a Mongoose CastError / HTTP 500.
  if (!isValidObjectId(configId)) return false;
  await connectToDatabase();
  return (await releaseConfigs({ owner: user._id, _id: configId })) > 0;
};

/** Removes every design the user owns, when their account is deleted. */
export const deleteUserConfigs = async (user: AuthenticatedUser) => {
  await connectToDatabase();
  await releaseConfigs({ owner: user._id });
};
