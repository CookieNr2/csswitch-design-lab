import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { isValidObjectId } from "mongoose";
import { connectToDatabase } from "@/lib/server/db";
import { toSessionUser } from "@/lib/server/dto";
import { env } from "@/lib/server/env";
import { UserModel } from "@/lib/server/models/user";
import type { SessionUser } from "@/lib/types";

const SESSION_COOKIE = "token";
const SESSION_MAX_AGE = 60 * 60; // 1 hour, matching the original JWT lifetime.

const secretKey = new TextEncoder().encode(env.JWT_SECRET);

declare const verified: unique symbol;

/**
 * A user whose session this module has checked. Nothing else can make one
 * without a cast, so a data function that asks for it always runs for the
 * signed-in user, never for an id taken from a form, a URL or a request body.
 */
export type AuthenticatedUser = SessionUser & { readonly [verified]: true };

export const signSessionToken = async (userId: string) => {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey);
};

const verifySessionToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    // A well-signed token can still carry a subject that is not a user id;
    // without this the lookup throws a CastError and surfaces as a 500.
    return payload.sub && isValidObjectId(payload.sub) ? payload.sub : null;
  } catch {
    return null;
  }
};

export const startSession = async (userId: string) => {
  const token = await signSessionToken(userId);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProduction,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
};

export const endSession = async () => {
  (await cookies()).delete(SESSION_COOKIE);
};

/** API clients send `Authorization: Bearer <jwt>`; the browser sends the cookie. */
const readSessionToken = async () => {
  const header = (await headers()).get("authorization");
  if (!header) return (await cookies()).get(SESSION_COOKIE)?.value;

  // A malformed header is refused rather than quietly replaced by the cookie.
  const [scheme, token] = header.split(" ");
  return scheme?.toUpperCase() === "BEARER" ? token : undefined;
};

/**
 * The one place a session becomes a user, for pages, Server Actions and Route
 * Handlers alike. Wrapped in React's cache() so a request looks the session up
 * once, however many components ask for it (the navbar and the page both do).
 */
export const getCurrentUser = cache(async (): Promise<AuthenticatedUser | null> => {
  const token = await readSessionToken();
  if (!token) return null;

  const userId = await verifySessionToken(token);
  if (!userId) return null;

  await connectToDatabase();
  const user = await UserModel.findById(userId).select("-password").lean();
  return user ? (toSessionUser(user) as AuthenticatedUser) : null;
});

export const requireUser = async (): Promise<AuthenticatedUser> => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
};
