import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { connectToDatabase } from "@/lib/server/db";
import { toColor, toSwitchPart, type ColorRecord } from "@/lib/server/dto";
import { ColorModel } from "@/lib/server/models/color";
import { SwitchPartModel } from "@/lib/server/models/switch-part";
import type { Color, SwitchPart } from "@/lib/types";

/** The app never writes the catalog (scripts/seed.mjs loads it), so nothing clears this tag. */
export const CATALOG_TAG = "catalog";

export const getColors = async (): Promise<Color[]> => {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("hours");

  await connectToDatabase();
  const colors = await ColorModel.find().sort({ updatedAt: -1 }).lean();
  return colors.map(toColor);
};

export const getSwitchParts = async (): Promise<SwitchPart[]> => {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("hours");

  await connectToDatabase();
  const parts = await SwitchPartModel.find()
    .populate<{ defaultColor: ColorRecord | null; colorOptions: ColorRecord[] }>(
      "defaultColor colorOptions"
    )
    .sort({ updatedAt: -1 })
    .lean();
  return parts.map(toSwitchPart).filter((part): part is SwitchPart => part !== null);
};

/** Colours by id, for turning stored colour ids back into colours. */
export const getColorLookup = async (): Promise<Map<string, Color>> => {
  const colors = await getColors();
  return new Map(colors.map((color) => [color._id, color]));
};
