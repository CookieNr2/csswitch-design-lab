import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { badRequest, noContent, notFound, readJson, unauthorized } from "@/lib/server/api";
import { endSession, getCurrentUser } from "@/lib/server/auth";
import { CONFIGS_TAG } from "@/lib/server/configs";
import { describeError } from "@/lib/server/errors";
import { deleteAccount, updateAccount } from "@/lib/server/users";
import { accountSchema, firstIssue } from "@/lib/schemas";

export const GET = async () => {
  const user = await getCurrentUser();
  return user ? NextResponse.json(user) : unauthorized();
};

export const PATCH = async (request: Request) => {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  // Fall back to the stored values so a partial PATCH stays a partial update.
  const parsed = accountSchema.safeParse({
    firstName: body.firstName ?? user.firstName,
    lastName: body.lastName ?? user.lastName,
    email: body.email ?? user.email,
    street: body.street ?? user.location?.street ?? "",
    postalCode: body.postalCode ?? String(user.location?.postalCode ?? ""),
    paymentMethodType: body.paymentMethodType ?? user.paymentMethod?.type ?? "",
    cardNumber: body.cardNumber ?? user.paymentMethod?.cardNumber ?? "",
  });
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  try {
    const updated = await updateAccount(user, parsed.data);
    return updated ? NextResponse.json(updated) : notFound("User not found");
  } catch (error) {
    return badRequest(describeError(error));
  }
};

export const DELETE = async () => {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const deleted = await deleteAccount(user);
  if (!deleted) return notFound("User not found");

  await endSession();
  // "max": Route Handlers cannot use updateTag, so the galleries refresh in the background.
  revalidateTag(CONFIGS_TAG, "max");
  return noContent();
};
