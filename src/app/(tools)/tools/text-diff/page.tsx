"use client";

import { useState } from "react";
import * as Diff from "diff";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

export default function TextDiffPage() {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");

    const diffResult = Diff.diffLines(original, modified);

    const stats = {
        added: diffResult.filter(part => part.added).length,
        removed: diffResult.filter(part => part.removed).length,
    };

    return (
        <ToolPageLayout
            id="text-diff"
            title="Text Diff Checker"
            description="Instantly compare two blocks of text to see additions, deletions, and modifications."
            icon="📊"
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {/* Inputs Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.25rem",
                        marginBottom: "1.5rem",
                    }}
                    className="diff-input-grid"
                >
                    {/* Original */}
                    <div className="card" style={{ padding: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                            <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Original Text
                            </label>
                            <button onClick={() => setOriginal("")} className="btn btn-ghost btn-xs">Clear</button>
                        </div>
                        <textarea
                            className="input"
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                            placeholder="Paste original text here..."
                            rows={8}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", minHeight: "200px" }}
                        />
                    </div>

                    {/* Modified */}
                    <div className="card" style={{ padding: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                            <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Modified Text
                            </label>
                            <button onClick={() => setModified("")} className="btn btn-ghost btn-xs">Clear</button>
                        </div>
                        <textarea
                            className="input"
                            value={modified}
                            onChange={(e) => setModified(e.target.value)}
                            placeholder="Paste modified text here..."
                            rows={8}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", minHeight: "200px" }}
                        />
                    </div>
                </div>

                {/* Diff Result */}
                <div className="card" style={{ padding: "1.5rem", minHeight: "300px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Comparison Result</h3>
                        <div style={{ display: "flex", gap: "1rem", fontSize: "0.8125rem" }}>
                            <span style={{ color: "#10b981", fontWeight: 600 }}>+ {stats.added} additions</span>
                            <span style={{ color: "#ef4444", fontWeight: 600 }}>- {stats.removed} deletions</span>
                        </div>
                    </div>

                    <div
                        className="code-block"
                        style={{
                            padding: "1rem",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.875rem",
                            lineHeight: 1.6,
                        }}
                    >
                        {original || modified ? (
                            diffResult.map((part, i) => {
                                const color = part.added ? "rgba(16, 185, 129, 0.2)" : part.removed ? "rgba(239, 68, 68, 0.2)" : "transparent";
                                const prefix = part.added ? "+" : part.removed ? "-" : " ";
                                return (
                                    <span
                                        key={i}
                                        style={{
                                            display: "block",
                                            background: color,
                                            padding: "0 4px",
                                            borderRadius: "2px",
                                            color: part.added ? "#10b981" : part.removed ? "#ef4444" : "var(--text-primary)",
                                        }}
                                    >
                                        {part.value.split("\n").map((line, li) => {
                                            if (line === "" && li === part.value.split("\n").length - 1) return null;
                                            return <span key={li} style={{ display: "block" }}>{prefix} {line}</span>;
                                        })}
                                    </span>
                                );
                            })
                        ) : (
                            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "4rem 0" }}>
                                Paste text into both fields above to see the difference.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .diff-input-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </ToolPageLayout>
    );
}
