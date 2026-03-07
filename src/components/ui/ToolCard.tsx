import Link from "next/link";
import type { Tool } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";

export default function ToolCard({ tool }: { tool: Tool }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const fav = isFavorite(tool.id);

    const categoryColors: Record<string, string> = {
        formatting: "badge-accent",
        encoding: "badge-accent",
        security: "badge-warning",
        design: "badge-success",
        developer: "badge-accent",
        text: "badge-muted",
    };

    return (
        <Link
            href={tool.available ? tool.href : "#"}
            id={`tool-card-${tool.id}`}
            className={`card tool-card animate-fade-in ${!tool.available ? "opacity-50 pointer-events-none" : ""}`}
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
                textDecoration: "none",
                cursor: tool.available ? "pointer" : "default",
                position: "relative",
                overflow: "hidden",
                transition: "box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease",
            }}
            onMouseEnter={(e) => {
                if (tool.available) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                }
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
            }}
        >
            {/* Favorite Toggle */}
            {tool.available && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(tool.id);
                    }}
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px",
                        color: fav ? "#ef4444" : "var(--text-muted)",
                        transition: "transform 0.2s, color 0.2s",
                        zIndex: 10,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.2)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={fav ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.045 3 5.5L12 21l7-7Z" />
                    </svg>
                </button>
            )}

            {/* Coming soon overlay */}
            {!tool.available && (
                <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "-28px",
                        transform: "rotate(45deg)",
                        background: "var(--text-muted)",
                        color: "var(--bg-primary)",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        padding: "2px 32px",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                    }}
                >
                    Soon
                </div>
            )}

            {/* Icon */}
            <div
                style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--accent-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    marginBottom: "1rem",
                    flexShrink: 0,
                }}
            >
                {tool.icon}
            </div>

            {/* Name + badge */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                    flexWrap: "wrap",
                }}
            >
                <h3
                    style={{
                        fontSize: "1.0625rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        margin: 0,
                        lineHeight: 1.3,
                    }}
                >
                    {tool.name}
                </h3>
                <span className={`badge ${categoryColors[tool.category] ?? "badge-muted"}`}>
                    {tool.category}
                </span>
            </div>

            {/* Description */}
            <p
                style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                }}
            >
                {tool.description}
            </p>

            {/* Arrow indicator */}
            {tool.available && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        marginTop: "1rem",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                    }}
                >
                    Open tool
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
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </div>
            )}
        </Link>
    );
}
