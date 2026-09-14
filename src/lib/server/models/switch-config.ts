import "server-only";
import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";
import { PART_NAMES, type PartName } from "@/lib/types";

const colorRef = () =>
  ({
    type: Schema.Types.ObjectId,
    ref: "Colors",
    required: true,
  }) as const;

// Built from PART_NAMES so adding a part needs no edit here. The cast tells
// InferSchemaType which fields that produces; Object.fromEntries cannot.
const partFields = Object.fromEntries(
  PART_NAMES.map((part) => [part, colorRef()])
) as Record<PartName, ReturnType<typeof colorRef>>;

const switchConfigSchema = new Schema(
  {
    name: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", default: null },
    ...partFields,
  },
  { timestamps: true }
);

export type SwitchConfigDoc = InferSchemaType<typeof switchConfigSchema>;

// Mongoose derives the collection name from this string: "Switch Configuration"
// -> `switch configurations`, which is where the data lives. Renaming it would
// silently start reading an empty collection.
export const SwitchConfigModel: Model<SwitchConfigDoc> =
  (models["Switch Configuration"] as Model<SwitchConfigDoc>) ??
  model<SwitchConfigDoc>("Switch Configuration", switchConfigSchema);
