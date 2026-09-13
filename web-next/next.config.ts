import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Without this Turbopack walks up past the repo and picks the wrong lockfile.
  turbopack: { root: import.meta.dirname },
  // bcrypt is a native addon and mongoose relies on dynamic requires; both must
  // stay outside the server bundle.
  serverExternalPackages: ["bcrypt", "mongoose"],
  output: "standalone",
  // Partial Prerendering: a static shell with dynamic holes streamed in.
  cacheComponents: true,
};

export default nextConfig;
