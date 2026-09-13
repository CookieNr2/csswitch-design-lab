"use client";

import { useEffect } from "react";
import { Button } from "@/components/shadcn/button";
import { Card } from "@/components/shadcn/card";

/**
 * Catches render and data-fetching failures for every route below the root
 * layout -- an unreachable database being the likely one here.
 */
const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mx-auto max-w-xl rounded-none border-neutral-700 bg-neutral-800 p-8 shadow-lg">
        <h1 className="mb-3 text-3xl font-semibold">Something went wrong</h1>
        <p className="text-neutral-400">
          We could not load this page. This is usually temporary.
        </p>
        {error.digest && (
          <p className="text-sm text-neutral-400">Reference: {error.digest}</p>
        )}
        <Button type="button" onClick={reset} className="mt-6 h-11 w-fit rounded-none px-6 text-base">
          Try again
        </Button>
      </Card>
    </div>
  );
};

export default ErrorBoundary;
