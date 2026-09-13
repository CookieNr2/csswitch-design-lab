import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const orderSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    location: {
      street: { type: String, required: true },
      postalCode: { type: Number, required: true },
    },
    paymentMethod: {
      type: { type: String, required: true },
      cardNumber: { type: String, required: true },
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", default: null },
    switchConfig: {
      type: Schema.Types.ObjectId,
      ref: "Switch Configuration",
      required: true,
    },
  },
  { timestamps: true }
);

export type OrderDoc = InferSchemaType<typeof orderSchema>;

export const OrderModel: Model<OrderDoc> =
  (models.Order as Model<OrderDoc>) ?? model<OrderDoc>("Order", orderSchema);
