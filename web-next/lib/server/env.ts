import "server-only";
import { z } from "zod";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Used only outside production, so `next dev` works without extra setup. In
 * production a missing value stops the app with a clear message instead of
 * silently pointing it at localhost.
 */
const developmentDefaults = {
  MONGODB_URI: "mongodb://127.0.0.1:27017/Niiax",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
};

const envSchema = z.object({
  MONGODB_URI: z
    .string({ error: "is required" })
    .regex(/^mongodb(\+srv)?:\/\//, "must start with mongodb:// or mongodb+srv://"),
  JWT_SECRET: z.string({ error: "is required" }),
  NEXT_PUBLIC_SITE_URL: z.url({ error: "must be an absolute URL, such as https://example.com" }),
});

/** Docker's `ENV NAME=$ARG` sets an empty string when the build arg is missing. */
const read = (value: string | undefined) => value || undefined;

const parsed = envSchema.safeParse({
  MONGODB_URI:
    read(process.env.MONGODB_URI) ??
    (isProduction ? undefined : developmentDefaults.MONGODB_URI),
  JWT_SECRET: read(process.env.JWT_SECRET),
  // Spelled out in full: Next.js inlines NEXT_PUBLIC_* values at build time, but
  // only for literal `process.env.NAME` expressions.
  NEXT_PUBLIC_SITE_URL:
    read(process.env.NEXT_PUBLIC_SITE_URL) ??
    (isProduction ? undefined : developmentDefaults.NEXT_PUBLIC_SITE_URL),
});

if (!parsed.success) {
  throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
}

/**
 * The only place that reads process.env. Validated once, when server code first
 * loads this module, so a misconfigured build or deploy fails loudly instead of
 * misbehaving later.
 */
export const env = { ...parsed.data, isProduction };
