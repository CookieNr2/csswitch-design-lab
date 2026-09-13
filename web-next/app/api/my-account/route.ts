import { NextResponse } from "next/server";
import { apiUser, badRequest, notFound, readJson, unauthorized } from "@/lib/api";
import { deleteAccount, describeError, updateAccount } from "@/lib/mutations";
import { accountSchema, firstIssue } from "@/lib/schemas";

export const GET = async (request: Request) => {
  const user = await apiUser(request);
  return user ? NextResponse.json(user) : unauthorized();
};

export const PATCH = async (request: Request) => {
  const user = await apiUser(request);
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
    const updated = await updateAccount(user._id, parsed.data);
    return updated ? NextResponse.json(updated) : notFound("User not found");
  } catch (error) {
    return badRequest(describeError(error));
  }
};

export const DELETE = async (request: Request) => {
  const user = await apiUser(request);
  if (!user) return unauthorized();

  const deleted = await deleteAccount(user._id);
  return deleted ? new NextResponse(null, { status: 204 }) : notFound("User not found");
};
