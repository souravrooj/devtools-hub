"use client";

import { useState, useCallback, useEffect } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";
import { generatePassword } from "@/lib/utils";
import type { PasswordOptions } from "@/types";

export default function PasswordGeneratorPage() {
    const [options, setOptions] = useState<PasswordOptions>({
        length: 20,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [password, setPassword] = useState("");

    const generate = useCallback(() => {
        const pwd = generatePassword(options);
        setPassword(pwd);
    }, [options]);

    // Generate on mount and whenever options change
    useEffect(() => {
        generate();
    }, [generate]);

    const strengthLabel = (() => {
        const { length, uppercase, lowercase, numbers, symbols } = options;
        const types = [uppercase, lowercase, numbers, symbols].filter(Boolean).length;
        if (length >= 20 && types >= 3) return { label: "Very Strong", color: "#10b981", bg: "rgb(16 185 129 / 0.1)" };
        if (length >= 14 && types >= 3) return { label: "Strong", color: "#10b981", bg: "rgb(16 185 129 / 0.1)" };
        if (length >= 10 && types >= 2) return { label: "Fair", color: "#f59e0b", bg: "rgb(245 158 11 / 0.1)" };
        return { label: "Weak", color: "#ef4444", bg: "rgb(239 68 68 / 0.1)" };
    })();

    const toggleOption = (key: keyof Omit<PasswordOptions, "length">) => {
        setOptions((prev) => {
            const next = { ...prev, [key]: !prev[key] };
            // Ensure at least one character type is selected
            const anySelected = next.uppercase || next.lowercase || next.numbers || next.symbols;
            if (!anySelected) return prev;
            return next;
        });
    };

    return (
        <ToolPageLayout
            id="password-generator"
            title="Password Generator"
            description="Generate cryptographically secure passwords with customizable options."
            icon="🔐"
        >
            <div
                className="card"
                style={{ padding: "2rem", maxWidth: "640px", margin: "0 auto" }}
            >
                {/* Generated password display */}
                <div
                    style={{
                        background: "var(--bg-muted)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        padding: "1.25rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.125rem",
                        letterSpacing: "0.02em",
                        wordBreak: "break-all",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                        textAlign: "center",
                        marginBottom: "1rem",
                        minHeight: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {password || "—"}
                </div>

                {/* Strength badge + buttons */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1.5rem",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                    }}
                >
                    <span
                        style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "99px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            background: strengthLabel.bg,
                            color: strengthLabel.color,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        {strengthLabel.label}
                    </span>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="btn btn-primary btn-sm" onClick={generate}>
                            🔄 Regenerate
                        </button>
                        <CopyButton text={password} size="sm" />
                    </div>
                </div>

                <div className="divider" />

                {/* Length slider */}
                <div style={{ marginBottom: "1.25rem" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <label
                            style={{
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                color: "var(--text-primary)",
                            }}
                        >
                            Password Length
                        </label>
                        <span
                            style={{
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "var(--accent)",
                                fontFamily: "var(--font-mono)",
                                minWidth: "32px",
                                textAlign: "center",
                            }}
                        >
                            {options.length}
                        </span>
                    </div>
                    <input
                        type="range"
                        min={4}
                        max={128}
                        value={options.length}
                        onChange={(e) =>
                            setOptions((prev) => ({
                                ...prev,
                                length: parseInt(e.target.value),
                            }))
                        }
                        style={{ width: "100%", accentColor: "var(--accent)" }}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            marginTop: "0.25rem",
                        }}
                    >
                        <span>4</span>
                        <span>128</span>
                    </div>
                </div>

                {/* Character type toggles */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {(
                        [
                            { key: "uppercase" as const, label: "Uppercase (A-Z)", example: "ABCDEFGHIJ" },
                            { key: "lowercase" as const, label: "Lowercase (a-z)", example: "abcdefghij" },
                            { key: "numbers" as const, label: "Numbers (0-9)", example: "0123456789" },
                            { key: "symbols" as const, label: "Symbols (!@#$...)", example: "!@#$%^&*()" },
                        ] as const
                    ).map((opt) => (
                        <label
                            key={opt.key}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.625rem 0.875rem",
                                borderRadius: "var(--radius-md)",
                                background: options[opt.key] ? "var(--accent-muted)" : "var(--bg-muted)",
                                border: `1px solid ${options[opt.key] ? "var(--accent)" : "var(--border)"}`,
                                cursor: "pointer",
                                transition: "all 150ms ease",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={options[opt.key]}
                                onChange={() => toggleOption(opt.key)}
                                style={{ accentColor: "var(--accent)", width: "16px", height: "16px" }}
                            />
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {opt.label}
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "var(--text-muted)",
                                        fontFamily: "var(--font-mono)",
                                    }}
                                >
                                    {opt.example}
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </ToolPageLayout>
    );
}
