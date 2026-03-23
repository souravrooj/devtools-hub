"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import yaml from "js-yaml";
import CopyButton from "@/components/ui/CopyButton";
import ResizableLayout from "@/components/ui/ResizableLayout";

export default function YAMLtoJSON() {
    const [input, setInput] = useState("");
    const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");

    const result = useMemo(() => {
        if (!input.trim()) return { output: "", error: null };

        try {
            if (mode === "yaml-to-json") {
                const data = yaml.load(input);
                return { output: JSON.stringify(data, null, 4), error: null };
            } else {
                const data = JSON.parse(input);
                return { output: yaml.dump(data), error: null };
            }
        } catch (e: any) {
            return { output: "", error: e.message || "Failed to convert" };
        }
    }, [input, mode]);

    const handleSwap = () => {
        if (result.output && !result.error) {
            setInput(result.output);
            setMode(prev => prev === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json");
        } else {
            setMode(prev => prev === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json");
        }
    };

    const labelStyle = {
        display: "block",
        fontSize: "0.8125rem",
        fontWeight: 600,
        color: "var(--text-secondary)",
        marginBottom: "0.5rem",
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
    };

    const leftPanel = (
        <div className="card" style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label style={labelStyle}>{mode === "yaml-to-json" ? "YAML Input" : "JSON Input"}</label>
                <button onClick={() => setInput("")} className="btn btn-ghost btn-sm" style={{ padding: "2px 8px" }}>Clear</button>
            </div>
            <textarea
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "yaml-to-json" ? "Paste YAML here..." : "Paste JSON here..."}
                style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "0.875rem", resize: "none", minHeight: "400px" }}
            />
        </div>
    );

    const rightPanel = (
        <div className="card" style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label style={labelStyle}>{mode === "yaml-to-json" ? "JSON Output" : "YAML Output"}</label>
                {result.output && <CopyButton text={result.output} size="sm" variant="ghost" />}
            </div>

            {result.error ? (
                <div
                    style={{
                        padding: "1rem",
                        color: "#ef4444",
                        background: "rgba(239, 68, 68, 0.05)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8125rem",
                        flex: 1,
                        whiteSpace: "pre-wrap"
                    }}
                >
                    ❌ {result.error}
                </div>
            ) : (
                <pre
                    className="code-block"
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        margin: 0,
                        fontSize: "0.8125rem",
                        minHeight: "400px"
                    }}
                >
                    {result.output || "Result will appear here..."}
                </pre>
            )}
        </div>
    );

    return (
        <ToolPageLayout
            id="yaml-to-json"
            title="YAML ↔ JSON Converter"
            description="Convert between YAML and JSON formats instantly. Perfect for configuration files and API data."
            icon="📄"
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {/* Mode Selector */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1.5rem"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            background: "var(--bg-muted)",
                            padding: "4px",
                            borderRadius: "var(--radius-md)"
                        }}
                    >
                        <button
                            onClick={() => setMode("yaml-to-json")}
                            className={`btn btn-sm ${mode === "yaml-to-json" ? "btn-primary" : "btn-ghost"}`}
                            style={{ borderRadius: "var(--radius-sm)" }}
                        >
                            YAML to JSON
                        </button>
                        <button
                            onClick={() => setMode("json-to-yaml")}
                            className={`btn btn-sm ${mode === "json-to-yaml" ? "btn-primary" : "btn-ghost"}`}
                            style={{ borderRadius: "var(--radius-sm)" }}
                        >
                            JSON to YAML
                        </button>
                    </div>

                    <button
                        onClick={handleSwap}
                        className="btn btn-ghost btn-sm"
                        style={{ gap: "0.5rem" }}
                        title="Swap content and direction"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m7 16-4-4 4-4" /><path d="m17 8 4 4-4 4" /><path d="M3 12h18" />
                        </svg>
                        Swap
                    </button>
                </div>

                <ResizableLayout left={leftPanel} right={rightPanel} />
            </div>
        </ToolPageLayout>
    );
}
