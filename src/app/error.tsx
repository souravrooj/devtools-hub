"use client";

import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                textAlign: "center",
                background: "var(--bg-primary)",
            }}
        >
            <div
                className="animate-fade-in"
                style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "var(--radius-lg)",
                    background: "rgb(239 68 68 / 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    marginBottom: "1.5rem",
                }}
            >
                ⚠️
            </div>

            <h1
                className="animate-fade-in"
                style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: "0 0 0.5rem",
                    animationDelay: "0.05s",
                }}
            >
                Something went wrong
            </h1>

            <p
                className="animate-fade-in"
                style={{
                    fontSize: "1rem",
                    color: "var(--text-secondary)",
                    maxWidth: "420px",
                    lineHeight: 1.6,
                    margin: "0 0 0.5rem",
                    animationDelay: "0.1s",
                }}
            >
                An unexpected error occurred. This has been logged automatically.
            </p>

            {error?.message && (
                <pre
                    className="animate-fade-in"
                    style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        background: "var(--bg-muted)",
                        borderRadius: "var(--radius-sm)",
                        padding: "0.5rem 1rem",
                        margin: "0.5rem 0 1.5rem",
                        maxWidth: "500px",
                        overflow: "auto",
                        fontFamily: "var(--font-mono)",
                        animationDelay: "0.15s",
                    }}
                >
                    {error.message}
                </pre>
            )}

            <div
                className="animate-fade-in"
                style={{
                    display: "flex",
                    gap: "0.75rem",
                    animationDelay: "0.2s",
                }}
            >
                <button onClick={reset} className="btn btn-primary">
                    Try Again
                </button>
                <Link href="/" className="btn btn-secondary">
                    Go Home
                </Link>
            </div>
        </div>
    );
}
