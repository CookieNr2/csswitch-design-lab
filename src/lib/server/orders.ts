import "server-only";
import type { Types } from "mongoose";
import type { AuthenticatedUser } from "@/lib/server/auth";
import { buildConfig, type ConfigInput } from "@/lib/server/configs";
import { connectToDatabase } from "@/lib/server/db";
import { ValidationFailure } from "@/lib/server/errors";
import { OrderModel } from "@/lib/server/models/order";
import { SwitchConfigModel } from "@/lib/server/models/switch-config";
import type { OrderFields } from "@/lib/schemas";

const buildOrder = (
  owner: AuthenticatedUser | null,
  input: OrderFields,
  switchConfig: string | Types.ObjectId
) =>
  new OrderModel({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    location: {
      street: input.location.street,
      postalCode: Number(input.location.postalCode),
    },
    paymentMethod: input.paymentMethod,
    owner: owner?._id ?? null,
    switchConfig,
  });

/** An order for a design that is already saved, as the REST API sends it. */
export const createOrder = async (
  owner: AuthenticatedUser | null,
  input: OrderFields,
  switchConfigId: string
) => {
  await connectToDatabase();

  if (!(await SwitchConfigModel.exists({ _id: switchConfigId }))) {
    throw new ValidationFailure("Configuration not found.");
  }

  const order = await buildOrder(owner, input, switchConfigId).save();
  return String(order._id);
};

/**
 * Saves a design and its order together, as the configurator submits them.
 * Both are validated before anything is written, and the design is removed
 * again if the order still fails to save, so a failed order leaves nothing
 * behind. (A transaction would do this, but needs a replica set, which a local
 * MongoDB usually is not.)
 */
export const placeOrder = async (
  owner: AuthenticatedUser | null,
  input: { order: OrderFields; config: ConfigInput }
) => {
  await connectToDatabase();

  const config = buildConfig(owner, input.config);
  const order = buildOrder(owner, input.order, config._id);
  await Promise.all([config.validate(), order.validate()]);

  await config.save();
  try {
    await order.save();
  } catch (error) {
    await config.deleteOne();
    throw error;
  }

  return String(order._id);
};
