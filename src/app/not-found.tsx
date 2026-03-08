import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "6rem 2rem",
                textAlign: "center",
                background: "var(--bg-primary)",
            }}
        >
            {/* Animated 404 */}
            <div
                className="animate-fade-in"
                style={{
                    fontSize: "8rem",
                    fontWeight: 900,
                    letterSpacing: "-0.06em",
                    lineHeight: 1,
                    background:
                        "linear-gradient(135deg, var(--accent), #8b5cf6, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "0.5rem",
                }}
            >
                404
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
                Page Not Found
            </h1>

            <p
                className="animate-fade-in"
                style={{
                    fontSize: "1rem",
                    color: "var(--text-secondary)",
                    maxWidth: "420px",
                    lineHeight: 1.6,
                    margin: "0 0 2rem",
                    animationDelay: "0.1s",
                }}
            >
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back to the tools.
            </p>

            <div
                className="animate-fade-in"
                style={{
                    display: "flex",
                    gap: "0.75rem",
                    animationDelay: "0.15s",
                }}
            >
                <Link href="/" className="btn btn-primary btn-lg">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Back to Home
                </Link>
            </div>

            {/* Decorative gradient orb */}
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "600px",
                    height: "600px",
                    background:
                        "radial-gradient(ellipse at center, rgb(99 102 241 / 0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: -1,
                }}
            />
        </div>
    );
}
