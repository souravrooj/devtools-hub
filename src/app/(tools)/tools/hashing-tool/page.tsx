"use client";

import { useState, useEffect } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

type HashAlgo = "SHA-1" | "SHA-256" | "SHA-512";

export default function HashingTool() {
    const [input, setInput] = useState("");
    const [algo, setAlgo] = useState<HashAlgo>("SHA-256");
    const [hash, setHash] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const generateHash = async () => {
            if (!input.trim()) {
                setHash("");
                setError("");
                return;
            }

            try {
                const msgUint8 = new TextEncoder().encode(input);
                const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
                setHash(hashHex);
                setError("");
            } catch (e: any) {
                setError(e.message || "Hash generation failed");
                setHash("");
            }
        };

        generateHash();
    }, [input, algo]);

    const labelStyle = {
        display: "block",
        fontSize: "0.8125rem",
        fontWeight: 600,
        color: "var(--text-secondary)",
        marginBottom: "0.5rem",
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
    };

    return (
        <ToolPageLayout
            id="hashing-tool"
            title="Hashing Tool"
            description="Generate secure cryptographic hashes for text using SHA-1, SHA-256, or SHA-512. Runs entirely in your browser."
            icon="🔒"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                {/* Algorithm Selection */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "2rem",
                        background: "var(--bg-muted)",
                        padding: "4px",
                        borderRadius: "var(--radius-md)",
                        width: "fit-content"
                    }}
                >
                    {(["SHA-256", "SHA-512", "SHA-1"] as HashAlgo[]).map((a) => (
                        <button
                            key={a}
                            onClick={() => setAlgo(a)}
                            className={`btn btn-sm ${algo === a ? "btn-primary" : "btn-ghost"}`}
                            style={{ borderRadius: "var(--radius-sm)" }}
                        >
                            {a}
                        </button>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                    {/* Input */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <label style={labelStyle}>Input Text</label>
                            <button onClick={() => setInput("")} className="btn btn-ghost btn-sm">Clear</button>
                        </div>
                        <textarea
                            className="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type or paste text to hash..."
                            rows={6}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", resize: "vertical" }}
                        />
                    </div>

                    {/* Output */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <label style={labelStyle}>{algo} Hash Result</label>
                            {hash && <CopyButton text={hash} size="sm" variant="ghost" />}
                        </div>

                        {error ? (
                            <div style={{ padding: "1rem", color: "#ef4444", background: "rgba(239, 68, 68, 0.05)", borderRadius: "var(--radius-md)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                                ❌ {error}
                            </div>
                        ) : (
                            <pre
                                className="code-block"
                                style={{
                                    minHeight: "80px",
                                    wordBreak: "break-all",
                                    whiteSpace: "pre-wrap",
                                    fontSize: "1rem",
                                    color: "var(--accent-text)",
                                    fontWeight: 600
                                }}
                            >
                                {hash || "Result will appear here..."}
                            </pre>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "2rem",
                        padding: "1rem",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)"
                    }}
                >
                    <span style={{ fontSize: "1rem" }}>🔐</span>
                    <div>
                        <strong>Security Note:</strong> This tool uses the native <strong>Web Crypto API</strong> provided by your browser. Your input text never leaves your device — hashing is performed locally and securely.
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
}
