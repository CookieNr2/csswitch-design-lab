import "server-only";
import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const switchPartSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true },
    defaultColor: { type: Schema.Types.ObjectId, ref: "Colors", required: true },
    colorOptions: {
      type: [{ type: Schema.Types.ObjectId, ref: "Colors" }],
      required: true,
    },
  },
  { timestamps: true }
);

export type SwitchPartDoc = InferSchemaType<typeof switchPartSchema>;

export const SwitchPartModel: Model<SwitchPartDoc> =
  (models.SwitchParts as Model<SwitchPartDoc>) ??
  model<SwitchPartDoc>("SwitchParts", switchPartSchema);
