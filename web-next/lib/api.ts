import { NextResponse } from "next/server";
import { connectToDatabase, serialize } from "@/lib/db";
import { UserModel } from "@/lib/models/user";
import { getCurrentUser, verifySessionToken } from "@/lib/auth";
import type { SessionUser } from "@/lib/types";

/** Accepts either the session cookie or an `Authorization: Bearer <jwt>` header. */
export const apiUser = async (request: Request): Promise<SessionUser | null> => {
  const header = request.headers.get("authorization");
  if (!header) return getCurrentUser();

  const [scheme, token] = header.split(" ");
  if (scheme?.toUpperCase() !== "BEARER" || !token) return null;

  const userId = await verifySessionToken(token);
  if (!userId) return null;

  await connectToDatabase();
  const user = await UserModel.findById(userId).select("-password").lean();
  return user ? serialize<SessionUser>(user) : null;
};

export const unauthorized = () => {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
};

export const notFound = (message = "Not found") => {
  return NextResponse.json({ message }, { status: 404 });
};

export const badRequest = (message: string) => {
  return NextResponse.json({ message }, { status: 400 });
};

export const readJson = async (request: Request): Promise<Record<string, unknown>> => {
  try {
    const body = await request.json();
    return typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
};
