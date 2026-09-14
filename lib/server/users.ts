import "server-only";
import type { AuthenticatedUser } from "@/lib/server/auth";
import { deleteUserConfigs } from "@/lib/server/configs";
import { connectToDatabase } from "@/lib/server/db";
import { toSessionUser } from "@/lib/server/dto";
import { isDuplicateKeyError, ValidationFailure } from "@/lib/server/errors";
import { OrderModel } from "@/lib/server/models/order";
import { UserModel } from "@/lib/server/models/user";
import type { AccountFields, RegisterFields } from "@/lib/schemas";
import type { SessionUser } from "@/lib/types";

/** Email is the only unique field on a user, so a duplicate key always means it is taken. */
const rethrowEmailTaken = (error: unknown): never => {
  throw isDuplicateKeyError(error)
    ? new ValidationFailure("That email address is already registered.")
    : error;
};

/** The password rule is enforced by registerSchema and again by the User model's validator. */
export const createUser = async (input: RegisterFields): Promise<SessionUser> => {
  await connectToDatabase();
  const user = await UserModel.create(input).catch(rethrowEmailTaken);
  return toSessionUser(user.toObject());
};

/** The user id when the email and password match, otherwise null. */
export const authenticate = async (email: string, password: string) => {
  await connectToDatabase();
  const user = await UserModel.findOne({ email });
  if (!user || !(await user.checkPassword(password))) return null;
  return String(user._id);
};

export const updateAccount = async (
  user: AuthenticatedUser,
  input: AccountFields
): Promise<SessionUser | null> => {
  await connectToDatabase();

  const updated = await UserModel.findByIdAndUpdate(
    user._id,
    {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      location: {
        street: input.street || undefined,
        postalCode: input.postalCode ? Number(input.postalCode) : undefined,
      },
      paymentMethod: {
        type: input.paymentMethodType || undefined,
        cardNumber: input.cardNumber || undefined,
      },
    },
    { runValidators: true, returnDocument: "after" }
  )
    .select("-password")
    .lean()
    .catch(rethrowEmailTaken);

  return updated && toSessionUser(updated);
};

/**
 * Removes the account. Its designs go through deleteUserConfigs, and its
 * orders are kept without an owner. There is no transaction (they need a
 * replica set, which a local MongoDB usually is not), so the user is deleted
 * last: if a step fails the account still exists, and deleting it again
 * finishes the job.
 */
export const deleteAccount = async (user: AuthenticatedUser) => {
  await connectToDatabase();
  await deleteUserConfigs(user);
  await OrderModel.updateMany({ owner: user._id }, { owner: null });
  const result = await UserModel.deleteOne({ _id: user._id });
  return result.deletedCount > 0;
};
