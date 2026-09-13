import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";
import { PART_NAMES } from "@/lib/types";

const colorRef = () => ({
  type: Schema.Types.ObjectId,
  ref: "Colors",
  required: true,
});

const switchConfigSchema = new Schema(
  {
    name: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", default: null },
    ...Object.fromEntries(PART_NAMES.map((part) => [part, colorRef()])),
  },
  { timestamps: true }
);

export type SwitchConfigDoc = InferSchemaType<typeof switchConfigSchema>;

// The original API registered this model as "Switch Configuration", which
// Mongoose maps to the `switch configurations` collection. Keep it verbatim.
export const SwitchConfigModel: Model<SwitchConfigDoc> =
  (models["Switch Configuration"] as Model<SwitchConfigDoc>) ??
  model<SwitchConfigDoc>("Switch Configuration", switchConfigSchema);
