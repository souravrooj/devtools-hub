"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

export default function SVGOptimizer() {
    const [input, setInput] = useState("");

    const optimized = useMemo(() => {
        if (!input.trim()) return { code: "", originalSize: 0, newSize: 0, savings: 0 };

        try {
            let code = input;

            // 1. Remove XML declaration
            code = code.replace(/<\?xml.*?\?>/gi, "");

            // 2. Remove DOCTYPE
            code = code.replace(/<!DOCTYPE.*?>/gi, "");

            // 3. Remove Comments
            code = code.replace(/<!--[\s\S]*?-->/g, "");

            // 4. Remove Metadata / Editor info (Sketch, Figma, Inkscape etc)
            code = code.replace(/<(metadata|desc|title).*?>[\s\S]*?<\/\1>/g, "");
            code = code.replace(/\b(sodipodi|inkscape|sketch|xmlns:svgjs|xmlns:serif):[a-z0-9-]+=".*?"/gi, "");

            // 5. Clean up extra whitespace and newlines
            code = code.replace(/>\s+</g, "><"); // Remove between tags
            code = code.replace(/\s{2,}/g, " "); // Collapse multiple spaces
            code = code.trim();

            const originalSize = new Blob([input]).size;
            const newSize = new Blob([code]).size;
            const savings = originalSize > 0 ? ((originalSize - newSize) / originalSize) * 100 : 0;

            return {
                code,
                originalSize: (originalSize / 1024).toFixed(2),
                newSize: (newSize / 1024).toFixed(2),
                savings: savings.toFixed(1)
            };
        } catch (e) {
            return { code: "", originalSize: 0, newSize: 0, savings: 0, error: "Invalid SVG format" };
        }
    }, [input]);

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
            id="svg-optimizer"
            title="SVG Optimizer / Compressor"
            description="Clean up SVG code by removing metadata, comments, and extra whitespace to reduce file size."
            icon="⚡"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    {/* Input Area */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <label style={labelStyle}>Original SVG Code</label>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button onClick={() => setInput("")} className="btn btn-ghost btn-sm">Clear</button>
                            </div>
                        </div>
                        <textarea
                            className="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste raw SVG code here...&#10;<svg ...>...</svg>"
                            rows={15}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", resize: "vertical" }}
                        />
                        {input && (
                            <div style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                                Current Size: <strong>{optimized.originalSize} KB</strong>
                            </div>
                        )}
                    </div>

                    {/* Output Area */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <label style={labelStyle}>Optimized Result</label>
                            {optimized.code && <CopyButton text={optimized.code} size="sm" variant="ghost" />}
                        </div>
                        <textarea
                            className="input"
                            value={optimized.code}
                            readOnly
                            placeholder="Optimized result will appear here..."
                            rows={15}
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.8125rem",
                                resize: "none",
                                background: "var(--bg-muted)"
                            }}
                        />
                        {optimized.code && (
                            <div
                                style={{
                                    marginTop: "1rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "0.75rem",
                                    background: "rgba(34, 197, 94, 0.05)",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid rgba(34, 197, 94, 0.2)"
                                }}
                            >
                                <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                                    New Size: <strong>{optimized.newSize} KB</strong>
                                </div>
                                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--success)" }}>
                                    🔥 Saved {optimized.savings}%
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Visual Preview */}
                {optimized.code && (
                    <div style={{ marginTop: "3rem", textAlign: "center" }}>
                        <label style={labelStyle}>Visual Preview</label>
                        <div
                            style={{
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius-lg)",
                                padding: "3rem",
                                background: "repeating-conic-gradient(var(--border) 0% 25%, transparent 0% 50%) 50% / 20px 20px",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minWidth: "300px",
                                minHeight: "200px"
                            }}
                            dangerouslySetInnerHTML={{ __html: optimized.code }}
                        />
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
