"use client";

import { useEffect } from "react";

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
    <div className="container py-5">
      <div className="card shadow-lg border-0 mt-5">
        <div className="card-body p-5">
          <h1 className="text-light mb-3">Something went wrong</h1>
          <p className="text-white-50">
            We could not load this page. This is usually temporary.
          </p>
          {error.digest && (
            <p className="text-white-50">
              <small>Reference: {error.digest}</small>
            </p>
          )}
          <button
            type="button"
            className="btn btn-primary btn-lg rounded-0 my-3"
            onClick={reset}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
