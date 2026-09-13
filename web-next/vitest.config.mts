import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig } from "vitest/config";

const root = fileURLToPath(new URL("./", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      // Mirrors the "@/*" path in tsconfig.json.
      { find: /^@\/(.*)$/, replacement: `${root}$1` },
      // Next.js resolves `import "server-only"` itself. Plain Node cannot, so
      // tests get an empty module instead.
      { find: /^server-only$/, replacement: `${root}test/server-only.ts` },
    ],
  },
  test: {
    environment: "node",
    exclude: [...configDefaults.exclude, ".next/**"],
  },
});
