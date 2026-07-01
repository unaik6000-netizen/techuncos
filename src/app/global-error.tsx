"use client";

/**
 * Catastrophic error boundary — replaces the root layout when a top-level
 * render fails, so it ships its own <html>/<body> and uses inline styles
 * (no dependency on the app's CSS being available).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070d",
          color: "#f5f8fc",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <div>
          <p style={{ fontSize: 48, fontWeight: 700, margin: 0, color: "#38bdf8" }}>
            500
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginTop: 12 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a6b2c4", marginTop: 8, maxWidth: 360 }}>
            An unexpected error occurred. Please try again.
          </p>
          {error.digest && (
            <p style={{ color: "#6b7a90", marginTop: 8, fontSize: 12 }}>
              Reference: {error.digest}
            </p>
          )}
          <button
            onClick={() => reset()}
            style={{
              marginTop: 20,
              height: 44,
              padding: "0 20px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: "#05252f",
              background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
