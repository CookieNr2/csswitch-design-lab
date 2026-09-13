import mongoose from "mongoose";
import { connectToDatabase, serialize } from "@/lib/db";
import { OrderModel } from "@/lib/models/order";
import { SwitchConfigModel } from "@/lib/models/switch-config";
import { UserModel } from "@/lib/models/user";
import { PASSWORD_MESSAGE, PASSWORD_REGEX } from "@/lib/password";
import type { PartName, SessionUser } from "@/lib/types";
import type { AccountFields, OrderFields, RegisterFields } from "@/lib/schemas";

/**
 * Input types come from the zod schemas rather than being declared twice:
 * the parser and the type cannot drift apart.
 */
export type RegisterInput = RegisterFields;
export type AccountInput = AccountFields;
export type OrderInput = OrderFields;

/** A rule the submitted data broke, with a message safe to show the user. */
export class ValidationFailure extends Error {}

/** Turns a Mongoose failure into something worth showing a person. */
export const describeError = (error: unknown): string => {
  if (error instanceof ValidationFailure) {
    return error.message;
  }
  if (error instanceof mongoose.Error.ValidationError) {
    const first = Object.values(error.errors)[0];
    return first?.message ?? "Please review the form data.";
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  ) {
    return "That email address is already registered.";
  }
  console.error(error);
  return "Something went wrong. Please try again.";
};

export const createUser = async (input: RegisterInput): Promise<SessionUser> => {
  if (!PASSWORD_REGEX.test(input.password)) {
    throw new ValidationFailure(PASSWORD_MESSAGE);
  }

  await connectToDatabase();
  const user = await UserModel.create(input);
  const { password: _password, ...rest } = user.toObject();
  void _password;
  return serialize<SessionUser>(rest);
};

export const authenticate = async (email: string, password: string) => {
  await connectToDatabase();
  const user = await UserModel.findOne({ email });
  if (!user) return null;
  const matches = await user.checkPassword(password);
  return matches ? String(user._id) : null;
};

export const updateAccount = async (
  userId: string,
  input: AccountInput
): Promise<SessionUser | null> => {
  await connectToDatabase();

  const user = await UserModel.findByIdAndUpdate(
    userId,
    {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      // The old form posted flat fields that the API never mapped onto the
      // nested schema paths, so address and payment edits silently vanished.
      location: {
        street: input.street || undefined,
        postalCode: input.postalCode ? Number(input.postalCode) : undefined,
      },
      paymentMethod: {
        type: input.paymentMethodType || undefined,
        cardNumber: input.cardNumber || undefined,
      },
    },
    { runValidators: true, new: true }
  )
    .select("-password")
    .lean();

  return user ? serialize<SessionUser>(user) : null;
};

export const deleteAccount = async (userId: string) => {
  await connectToDatabase();
  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) return false;
  await SwitchConfigModel.deleteMany({ owner: user._id });
  return true;
};

export const createConfig = async (input: {
  ownerId?: string | null;
  name?: string;
  colors: Record<PartName, string>;
}) => {
  await connectToDatabase();

  const config = await SwitchConfigModel.create({
    ...input.colors,
    name: input.name?.trim() || "New config",
    owner: input.ownerId ?? null,
  });

  return String(config._id);
};

export const updateConfig = async (
  userId: string,
  configId: string,
  input: { name?: string; colors?: Record<PartName, string> }
) => {
  if (!mongoose.isValidObjectId(configId)) return false;
  await connectToDatabase();

  const updated = await SwitchConfigModel.findOneAndUpdate(
    { _id: configId, owner: userId },
    {
      ...(input.colors ?? {}),
      ...(input.name !== undefined ? { name: input.name } : {}),
    },
    { runValidators: true, new: true }
  ).lean();

  return updated !== null;
};

export const deleteConfig = async (userId: string, configId: string) => {
  // A malformed id would otherwise surface as a Mongoose CastError / HTTP 500.
  if (!mongoose.isValidObjectId(configId)) return false;
  await connectToDatabase();
  // Scoped to the owner: the Express version deleted by id alone, so any
  // signed-in user could remove somebody else's configuration.
  const result = await SwitchConfigModel.findOneAndDelete({
    _id: configId,
    owner: userId,
  });
  return result !== null;
};

export const createOrder = async (
  input: OrderInput & { ownerId?: string | null; switchConfigId: string }
) => {
  await connectToDatabase();

  const order = await OrderModel.create({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    location: {
      street: input.location.street,
      postalCode: Number(input.location.postalCode),
    },
    paymentMethod: input.paymentMethod,
    owner: input.ownerId ?? null,
    switchConfig: input.switchConfigId,
  });

  return String(order._id);
};
