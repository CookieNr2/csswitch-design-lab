import "server-only";
import type { Types } from "mongoose";
import {
  PART_NAMES,
  type Color,
  type PartColors,
  type PartName,
  type SavedConfig,
  type SessionUser,
  type SwitchPart,
} from "@/lib/types";

/**
 * Everything that leaves lib/server is built here, as a plain object. Each
 * mapper names the fields it copies: a renamed schema field is a type error in
 * this file, and a field that is not listed (the password hash, timestamps)
 * cannot reach a page or an API response.
 */

export type ColorRecord = { _id: Types.ObjectId; name?: string | null; value: string };

export const toColor = (doc: ColorRecord): Color => ({
  _id: String(doc._id),
  name: doc.name ?? "",
  value: doc.value,
});

const isPartName = (value: string): value is PartName =>
  (PART_NAMES as readonly string[]).includes(value);

type SwitchPartRecord = {
  _id: Types.ObjectId;
  name: string;
  displayName: string;
  defaultColor: ColorRecord | null;
  colorOptions: ColorRecord[];
};

/** Null for a part the app does not know, or one whose default colour was deleted. */
export const toSwitchPart = (doc: SwitchPartRecord): SwitchPart | null => {
  if (!isPartName(doc.name) || !doc.defaultColor) return null;
  return {
    _id: String(doc._id),
    name: doc.name,
    displayName: doc.displayName,
    defaultColor: toColor(doc.defaultColor),
    colorOptions: doc.colorOptions.map(toColor),
  };
};

type UserRecord = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  location?: { street?: string | null; postalCode?: number | null } | null;
  paymentMethod?: { type?: string | null; cardNumber?: string | null } | null;
};

export const toSessionUser = (doc: UserRecord): SessionUser => ({
  _id: String(doc._id),
  firstName: doc.firstName,
  lastName: doc.lastName,
  email: doc.email,
  location: {
    street: doc.location?.street ?? undefined,
    postalCode: doc.location?.postalCode ?? undefined,
  },
  paymentMethod: {
    type: doc.paymentMethod?.type ?? undefined,
    cardNumber: doc.paymentMethod?.cardNumber ?? undefined,
  },
});

/** One colour per part, or null as soon as a part cannot be resolved. */
export const toPartColors = <T>(
  source: Record<PartName, T>,
  resolve: (value: T) => Color | undefined
): PartColors | null => {
  const colors = {} as PartColors;
  for (const part of PART_NAMES) {
    const color = resolve(source[part]);
    if (!color) return null;
    colors[part] = color;
  }
  return colors;
};

type ConfigRecord = { _id: Types.ObjectId; name?: string | null } & Record<
  PartName,
  ColorRecord | null
>;

/** A design with its colours populated. Null when one of them no longer exists. */
export const toSavedConfig = (doc: ConfigRecord): SavedConfig | null => {
  const colors = toPartColors(doc, (color) => (color ? toColor(color) : undefined));
  return colors && { _id: String(doc._id), name: doc.name ?? null, colors };
};
