import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                borderTop: "1px solid var(--border)",
                marginTop: "auto",
                padding: "2rem 0",
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    textAlign: "center",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <span style={{ fontSize: "1.25rem" }}>🧰</span>
                    <span
                        style={{
                            fontWeight: 700,
                            fontSize: "0.9375rem",
                            color: "var(--text-primary)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        DevTools<span style={{ color: "var(--accent)" }}>Hub</span>
                    </span>
                </div>

                {/* Navigation */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {[
                        { label: "Home", href: "/" },
                        { label: "JSON Formatter", href: "/tools/json-formatter" },
                        { label: "Password Generator", href: "/tools/password-generator" },
                        { label: "Markdown Preview", href: "/tools/markdown-preview" },
                        { label: "Base64", href: "/tools/base64" },
                        { label: "Color Palette", href: "/tools/color-palette" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                fontSize: "0.8125rem",
                                color: "var(--text-muted)",
                                textDecoration: "none",
                                transition: "color 150ms ease",
                            }}
                            onMouseEnter={(e) =>
                                ((e.target as HTMLElement).style.color = "var(--text-primary)")
                            }
                            onMouseLeave={(e) =>
                                ((e.target as HTMLElement).style.color = "var(--text-muted)")
                            }
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <p
                        style={{
                            fontSize: "0.8125rem",
                            color: "var(--text-muted)",
                            margin: 0,
                        }}
                    >
                        © {year} DevTools Hub · Free forever · No login required
                    </p>
                    <span style={{ color: "var(--border)", fontSize: "0.75rem" }}>·</span>
                    <a
                        href="https://github.com/souravrooj/devtools-hub"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: "0.8125rem",
                            color: "var(--text-muted)",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.375rem",
                            transition: "color 150ms ease",
                        }}
                        onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                            "var(--text-primary)")
                        }
                        onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                            "var(--text-muted)")
                        }
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
