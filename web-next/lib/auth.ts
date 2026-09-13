import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { isValidObjectId } from "mongoose";
import { connectToDatabase, serialize } from "@/lib/db";
import { UserModel } from "@/lib/models/user";
import type { SessionUser } from "@/lib/types";

export const SESSION_COOKIE = "token";
const SESSION_MAX_AGE = 60 * 60; // 1 hour, matching the original JWT lifetime.

const secretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
};

export const signSessionToken = async (userId: string) => {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
};

export const verifySessionToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    // A well-signed token can still carry a subject that is not a user id;
    // without this the lookup throws a CastError and surfaces as a 500.
    return payload.sub && isValidObjectId(payload.sub) ? payload.sub : null;
  } catch {
    return null;
  }
};

/**
 * The token used to live in localStorage, which made it readable by any script
 * on the page. It is now an httpOnly cookie the browser attaches automatically.
 */
export const startSession = async (userId: string) => {
  const token = await signSessionToken(userId);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
};

export const endSession = async () => {
  (await cookies()).delete(SESSION_COOKIE);
};

export const getCurrentUser = async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const userId = await verifySessionToken(token);
  if (!userId) return null;

  await connectToDatabase();
  const user = await UserModel.findById(userId).select("-password").lean();
  return user ? serialize<SessionUser>(user) : null;
};

/** For pages and actions that make no sense without an account. */
export const requireUser = async (): Promise<SessionUser> => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
};
