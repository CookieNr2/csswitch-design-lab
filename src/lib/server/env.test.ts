import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/** env.ts validates when it is first imported, so each test loads a fresh copy. */
const loadEnv = async () => (await import("@/lib/server/env")).env;

const stubEnv = (values: Record<string, string>) => {
  for (const [name, value] of Object.entries(values)) vi.stubEnv(name, value);
};

describe("env", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("falls back to local defaults outside production", async () => {
    stubEnv({ NODE_ENV: "development", MONGODB_URI: "", NEXT_PUBLIC_SITE_URL: "", JWT_SECRET: "dev" });

    const env = await loadEnv();

    expect(env.MONGODB_URI).toBe("mongodb://127.0.0.1:27017/Niiax");
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
    expect(env.isProduction).toBe(false);
  });

  it("stops in production when the database or site URL is missing", async () => {
    stubEnv({ NODE_ENV: "production", MONGODB_URI: "", NEXT_PUBLIC_SITE_URL: "", JWT_SECRET: "secret" });

    const message = await loadEnv().then(
      () => "loaded without an error",
      (error: unknown) => String(error)
    );

    expect(message).toContain("Invalid environment variables");
    expect(message).toContain("MONGODB_URI");
    expect(message).toContain("NEXT_PUBLIC_SITE_URL");
  });

  it("requires JWT_SECRET in every environment", async () => {
    stubEnv({ NODE_ENV: "development", JWT_SECRET: "" });

    await expect(loadEnv()).rejects.toThrow("JWT_SECRET");
  });

  it("rejects a connection string for another database", async () => {
    stubEnv({
      NODE_ENV: "production",
      MONGODB_URI: "postgres://localhost/csswitch",
      NEXT_PUBLIC_SITE_URL: "https://csswitch.example",
      JWT_SECRET: "secret",
    });

    await expect(loadEnv()).rejects.toThrow("MONGODB_URI");
  });
});
