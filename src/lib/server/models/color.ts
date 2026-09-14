import "server-only";
import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const colorSchema = new Schema(
  {
    name: { type: String, unique: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

export type ColorDoc = InferSchemaType<typeof colorSchema>;

// Model name kept as "Colors" so it maps to the existing `colors` collection.
export const ColorModel: Model<ColorDoc> =
  (models.Colors as Model<ColorDoc>) ?? model<ColorDoc>("Colors", colorSchema);
