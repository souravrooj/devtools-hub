"use client";

import { useClipboard } from "@/hooks/useClipboard";

interface CopyButtonProps {
    text: string;
    label?: string;
    size?: "sm" | "md";
    variant?: "primary" | "secondary" | "ghost";
}

export default function CopyButton({
    text,
    label = "Copy",
    size = "md",
    variant = "secondary",
}: CopyButtonProps) {
    const { copied, copy } = useClipboard();

    const sizeClass = size === "sm" ? "btn-sm" : "";
    const variantClass =
        variant === "primary"
            ? "btn-primary"
            : variant === "ghost"
                ? "btn-ghost"
                : "btn-secondary";

    return (
        <button
            onClick={() => copy(text)}
            className={`btn ${variantClass} ${sizeClass} ${copied ? "btn-success" : ""}`}
            style={{ minWidth: "80px", transition: "all 200ms ease" }}
        >
            {copied ? (
                <>
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
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                </>
            ) : (
                <>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    {label}
                </>
            )}
        </button>
    );
}
