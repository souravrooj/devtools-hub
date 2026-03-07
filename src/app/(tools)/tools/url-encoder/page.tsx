"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

export default function UrlEncoderPage() {
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [input, setInput] = useState("");

    const { output, error } = (() => {
        if (!input.trim()) return { output: "", error: null };
        try {
            if (mode === "encode") {
                return { output: encodeURIComponent(input), error: null };
            } else {
                return { output: decodeURIComponent(input), error: null };
            }
        } catch (err: any) {
            return { output: "", error: err.message || "Decoding failed. Invalid input." };
        }
    })();

    const handleSwap = () => {
        if (!output) return;
        setInput(output);
        setMode((prev) => (prev === "encode" ? "decode" : "encode"));
    };

    return (
        <ToolPageLayout
            id="url-encoder"
            title="URL Encoder / Decoder"
            description="Encode special characters in URLs or decode percent-encoded URL strings safely."
            icon="🔗"
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
                        onClick={() => setMode("encode")}
                        className={`btn btn-sm ${mode === "encode" ? "btn-primary" : "btn-ghost"}`}
                        style={{ borderRadius: "var(--radius-sm)" }}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode("decode")}
                        className={`btn btn-sm ${mode === "decode" ? "btn-primary" : "btn-ghost"}`}
                        style={{ borderRadius: "var(--radius-sm)" }}
                    >
                        Decode
                    </button>
                </div>

                {/* Input area */}
                <div style={{ marginBottom: "1.5rem" }}>
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
                                fontSize: "0.8125rem",
                                fontWeight: 600,
                                color: "var(--text-secondary)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Input Text
                        </label>
                        <button onClick={() => setInput("")} className="btn btn-ghost btn-sm">
                            Clear
                        </button>
                    </div>
                    <textarea
                        className="input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Enter ${mode === "encode" ? "plain text" : "URL-encoded string"} here...`}
                        rows={5}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.875rem",
                            resize: "vertical",
                        }}
                    />
                </div>

                {/* Swap button */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <button
                        onClick={handleSwap}
                        className="btn btn-ghost btn-sm"
                        disabled={!output}
                        style={{ gap: "0.375rem" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
                        Swap
                    </button>
                </div>

                {/* Output area */}
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
                            {mode === "encode" ? "URL Encoded" : "URL Decoded"}
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
                                flex: 1,
                                color: "#ef4444",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.875rem",
                            }}
                        >
                            <strong>❌ Error</strong>
                            <br />
                            {error}
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
