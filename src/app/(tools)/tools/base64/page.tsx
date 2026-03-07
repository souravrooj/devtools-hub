"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";
import { encodeBase64, decodeBase64 } from "@/lib/utils";

export default function Base64Page() {
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const output = (() => {
        if (!input.trim()) {
            setError(null);
            return "";
        }
        if (mode === "encode") {
            const result = encodeBase64(input);
            if (!result && input) {
                setError("Failed to encode input.");
                return "";
            }
            setError(null);
            return result;
        } else {
            const result = decodeBase64(input);
            if (!result && input) {
                setError("Invalid Base64 string. Check your input.");
                return "";
            }
            setError(null);
            return result;
        }
    })();

    const handleSwap = () => {
        if (!output) return;
        setInput(output);
        setMode((prev) => (prev === "encode" ? "decode" : "encode"));
        setError(null);
    };

    return (
        <ToolPageLayout
            id="base64"
            title="Base64 Encoder / Decoder"
            description="Encode plain text to Base64 or decode Base64 back to readable text."
            icon="🔄"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
                {/* Mode toggle */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "1.5rem",
                        padding: "4px",
                        background: "var(--bg-muted)",
                        borderRadius: "var(--radius-md)",
                        width: "fit-content",
                    }}
                >
                    <button
                        onClick={() => { setMode("encode"); setError(null); }}
                        className={`btn btn-sm ${mode === "encode" ? "btn-primary" : "btn-ghost"}`}
                        style={{ borderRadius: "var(--radius-sm)" }}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => { setMode("decode"); setError(null); }}
                        className={`btn btn-sm ${mode === "decode" ? "btn-primary" : "btn-ghost"}`}
                        style={{ borderRadius: "var(--radius-sm)" }}
                    >
                        Decode
                    </button>
                </div>

                {/* Input */}
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
                            htmlFor="base64-input"
                            style={{
                                fontSize: "0.8125rem",
                                fontWeight: 600,
                                color: "var(--text-secondary)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            {mode === "encode" ? "Plain Text" : "Base64 String"}
                        </label>
                        <button
                            onClick={() => { setInput(""); setError(null); }}
                            className="btn btn-ghost btn-sm"
                        >
                            Clear
                        </button>
                    </div>
                    <textarea
                        id="base64-input"
                        className="input"
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setError(null); }}
                        placeholder={
                            mode === "encode"
                                ? "Enter text to encode to Base64..."
                                : "Enter Base64 string to decode..."
                        }
                        rows={5}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.875rem",
                            resize: "vertical",
                        }}
                    />
                </div>

                {/* Swap button */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <button
                        onClick={handleSwap}
                        className="btn btn-ghost btn-sm"
                        disabled={!output}
                        title="Swap input and output"
                        style={{ gap: "0.375rem" }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M7 16V4m0 0L3 8m4-4l4 4" />
                            <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        Swap
                    </button>
                </div>

                {/* Output */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "0.8125rem",
                                fontWeight: 600,
                                color: "var(--text-secondary)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                        </span>
                        {output && <CopyButton text={output} size="sm" />}
                    </div>

                    {error ? (
                        <div
                            style={{
                                background: "rgb(239 68 68 / 0.08)",
                                border: "1px solid rgb(239 68 68 / 0.25)",
                                borderRadius: "var(--radius-md)",
                                padding: "1rem",
                                color: "#ef4444",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.875rem",
                            }}
                        >
                            ❌ {error}
                        </div>
                    ) : (
                        <pre
                            className="code-block"
                            style={{
                                minHeight: "100px",
                                margin: 0,
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-all",
                            }}
                        >
                            {output || (
                                <span style={{ color: "var(--text-muted)" }}>
                                    Result will appear here...
                                </span>
                            )}
                        </pre>
                    )}
                </div>
            </div>
        </ToolPageLayout>
    );
}
