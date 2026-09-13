"use client";

/**
 * Last resort: a failure in the root layout itself, where the normal
 * error boundary cannot render. It has to supply its own <html>/<body>.
 */
const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html lang="en">
    <body style={{ backgroundColor: "#121212", color: "#fff" }}>
      <div style={{ maxWidth: "40rem", margin: "4rem auto", padding: "0 1rem" }}>
        <h1>Something went wrong</h1>
        <p style={{ color: "#8a8b8d" }}>
          The application failed to start. Please try again.
        </p>
        {error.digest && <p style={{ color: "#8a8b8d" }}>Reference: {error.digest}</p>}
        <button
          type="button"
          onClick={reset}
          style={{
            background: "#57cc99",
            border: 0,
            color: "#fff",
            padding: "0.75rem 1.5rem",
            marginTop: "1rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </body>
  </html>
);

export default GlobalError;
