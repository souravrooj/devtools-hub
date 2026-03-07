"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";

export default function Header() {
    const { isDark, toggleTheme } = useTheme();
    const pathname = usePathname();

    const isHome = pathname === "/";

    return (
        <header
            style={{
                background: "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid var(--border)",
                position: "sticky",
                top: 0,
                zIndex: 50,
            }}
        >
            <div className="container" style={{ padding: "0 1.5rem" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "64px",
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.625rem",
                            textDecoration: "none",
                        }}
                    >
                        <div
                            style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "10px",
                                background: "linear-gradient(135deg, var(--accent), #8b5cf6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                flexShrink: 0,
                                boxShadow: "0 2px 8px rgb(99 102 241 / 0.3)",
                            }}
                        >
                            🧰
                        </div>
                        <div>
                            <span
                                style={{
                                    fontWeight: 800,
                                    fontSize: "1.0625rem",
                                    color: "var(--text-primary)",
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1,
                                }}
                            >
                                DevTools
                            </span>
                            <span
                                style={{
                                    fontWeight: 800,
                                    fontSize: "1.0625rem",
                                    color: "var(--accent)",
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1,
                                }}
                            >
                                Hub
                            </span>
                        </div>
                    </Link>

                    {/* Right side */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {/* Back to home (shown on tool pages) */}
                        {!isHome && (
                            <Link
                                href="/"
                                className="btn btn-ghost btn-sm"
                                style={{ gap: "0.375rem" }}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                <span>All Tools</span>
                            </Link>
                        )}

                        {/* GitHub link */}
                        <a
                            href="https://github.com/souravrooj/devtools-hub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm"
                            title="View on GitHub"
                            style={{ padding: "0.5rem" }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="btn btn-ghost btn-sm"
                            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            style={{ padding: "0.5rem" }}
                            id="theme-toggle"
                        >
                            {isDark ? (
                                /* Sun icon */
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            ) : (
                                /* Moon icon */
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
