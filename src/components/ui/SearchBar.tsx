"use client";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search tools... (e.g. json, password, color)",
}: SearchBarProps) {
    return (
        <div style={{ position: "relative", maxWidth: "560px", width: "100%" }}>
            {/* Search icon */}
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                }}
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
                id="tool-search"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="input"
                style={{
                    paddingLeft: "42px",
                    paddingRight: value ? "40px" : "14px",
                    height: "48px",
                    fontSize: "0.9375rem",
                    borderRadius: "var(--radius-lg)",
                }}
                autoComplete="off"
            />

            {/* Clear button */}
            {value && (
                <button
                    onClick={() => onChange("")}
                    title="Clear search"
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "var(--bg-muted)",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        fontSize: "14px",
                        lineHeight: 1,
                    }}
                >
                    ✕
                </button>
            )}
        </div>
    );
}
