import { isValidObjectId } from "mongoose";
import { cacheLife, cacheTag } from "next/cache";
import { connectToDatabase, serialize } from "@/lib/db";
import { ColorModel } from "@/lib/models/color";
import { SwitchPartModel } from "@/lib/models/switch-part";
import { SwitchConfigModel } from "@/lib/models/switch-config";
import { PART_NAMES, type Color, type PartColors, type SavedConfig, type SwitchPart } from "@/lib/types";

/**
 * Cache tags. Anything that writes designs calls revalidateTag(CONFIGS_TAG),
 * which is what lets the gallery pages be prerendered rather than rebuilt on
 * every request.
 */
export const CATALOG_TAG = "catalog";
export const CONFIGS_TAG = "configs";

export const getColors = async (): Promise<Color[]> => {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("hours");

  await connectToDatabase();
  const colors = await ColorModel.find().sort({ updatedAt: -1 }).lean();
  return serialize<Color[]>(colors);
};

export const getSwitchParts = async (): Promise<SwitchPart[]> => {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("hours");

  await connectToDatabase();
  const parts = await SwitchPartModel.find()
    .populate("defaultColor colorOptions")
    .sort({ updatedAt: -1 })
    .lean();
  return serialize<SwitchPart[]>(parts);
};

const colorsById = async (): Promise<Map<string, Color>> => {
  const colors = await getColors();
  return new Map(colors.map((color) => [color._id, color]));
};

/** Turns a record of part -> color id into the full color objects, or null if any is unknown. */
const resolveColors = (
  source: Record<string, unknown>,
  lookup: Map<string, Color>
): PartColors | null => {
  const resolved = {} as PartColors;
  for (const part of PART_NAMES) {
    const color = lookup.get(String(source[part]));
    if (!color) return null;
    resolved[part] = color;
  }
  return resolved;
};

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
    _id: Record<string, unknown>;
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

  const lookup = await colorsById();
  return grouped
    .map((group) => resolveColors(group._id, lookup))
    .filter((colors): colors is PartColors => colors !== null);
};

const toSavedConfig = (config: Record<string, unknown>): SavedConfig | null => {
  const colors = {} as PartColors;
  for (const part of PART_NAMES) {
    const color = config[part] as Color | undefined;
    if (!color?.value) return null;
    colors[part] = color;
  }
  return {
    _id: String(config._id),
    name: (config.name as string) ?? null,
    colors,
  };
};

export const getConfigById = async (id: string): Promise<SavedConfig | null> => {
  if (!isValidObjectId(id)) return null;
  await connectToDatabase();

  const config = await SwitchConfigModel.findById(id)
    .populate(PART_NAMES.join(" "))
    .lean();

  return config ? toSavedConfig(serialize<Record<string, unknown>>(config)) : null;
};

export const getUserConfigs = async (userId: string): Promise<SavedConfig[]> => {
  await connectToDatabase();

  const configs = await SwitchConfigModel.find({ owner: userId })
    .populate(PART_NAMES.join(" "))
    .sort({ updatedAt: -1 })
    .lean();

  return serialize<Record<string, unknown>[]>(configs)
    .map(toSavedConfig)
    .filter((config): config is SavedConfig => config !== null);
};
