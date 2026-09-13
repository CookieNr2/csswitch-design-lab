import "server-only";
import mongoose from "mongoose";
import { env } from "@/lib/server/env";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Next.js re-evaluates modules on every hot reload in dev and across serverless
// invocations in prod, so the connection is cached on globalThis to avoid
// opening a new pool each time.
const globalForMongoose = globalThis as typeof globalThis & {
  _mongooseCache?: MongooseCache;
};

const cached: MongooseCache = (globalForMongoose._mongooseCache ??= {
  conn: null,
  promise: null,
});

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  cached.promise ??= mongoose
    .connect(env.MONGODB_URI, { bufferCommands: false })
    .catch((error) => {
      // Let the next call retry instead of caching a rejected promise forever.
      cached.promise = null;
      throw error;
    });

  cached.conn = await cached.promise;
  return cached.conn;
};

/**
 * Mongoose documents carry ObjectIds and Dates that cannot cross the
 * server/client component boundary. Everything leaving this layer goes
 * through here first.
 */
export const serialize = <T>(value: unknown): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};
