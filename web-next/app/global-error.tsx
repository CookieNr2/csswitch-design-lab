"use client";

import "@/styles/globals.css";
import { Button } from "@/components/shadcn/button";

/**
 * Last resort: a failure in the root layout itself, where the normal error
 * boundary cannot render. It has to supply its own <html>/<body>, and its own
 * stylesheet import -- the root layout never ran.
 */
const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html lang="en" className="dark">
    <body className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="mb-3 text-3xl font-semibold">Something went wrong</h1>
        <p className="text-neutral-400">
          The application failed to start. Please try again.
        </p>
        {error.digest && (
          <p className="mt-2 text-sm text-neutral-400">
            Reference: {error.digest}
          </p>
        )}
        <Button type="button" onClick={reset} className="mt-6 h-11 rounded-none px-6 text-base">
          Try again
        </Button>
      </div>
    </body>
  </html>
);

export default GlobalError;
