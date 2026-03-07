"use client";

import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";
import jsBeautify from "js-beautify";

type Language = "html" | "css" | "js";

export default function CodeFormatterPage() {
    const [language, setLanguage] = useState<Language>("js");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [indentSize, setIndentSize] = useState(2);

    const formatCode = useCallback(() => {
        if (!input.trim()) {
            setOutput("");
            return;
        }

        const options = {
            indent_size: indentSize,
            space_in_empty_paren: true,
        };

        try {
            let formatted = "";
            if (language === "js") {
                formatted = jsBeautify.js(input, options);
            } else if (language === "css") {
                formatted = jsBeautify.css(input, options);
            } else if (language === "html") {
                formatted = jsBeautify.html(input, options);
            }
            setOutput(formatted);
        } catch (err) {
            console.error("Formatting error:", err);
            setOutput("Error: Could not format input. Please ensure it is valid code.");
        }
    }, [input, language, indentSize]);

    return (
        <ToolPageLayout
            id="code-formatter"
            title="Code Formatter"
            description="Prettify and format JavaScript, TypeScript, CSS, and HTML code blocks with customized indentation."
            icon="✨"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
                {/* Options Toolbar */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem",
                        flexWrap: "wrap",
                        gap: "1rem"
                    }}
                >
                    <div style={{ display: "flex", gap: "0.5rem", background: "var(--bg-muted)", padding: "4px", borderRadius: "8px" }}>
                        {(["js", "css", "html"] as Language[]).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={`btn btn-sm ${language === lang ? "btn-primary" : "btn-ghost"}`}
                                style={{ textTransform: "uppercase", fontSize: "0.75rem", minWidth: "60px" }}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <label style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Indent:</label>
                        <select
                            className="input"
                            style={{ padding: "4px 8px", fontSize: "0.8125rem", minWidth: "80px" }}
                            value={indentSize}
                            onChange={(e) => setIndentSize(parseInt(e.target.value))}
                        >
                            <option value={2}>2 Spaces</option>
                            <option value={4}>4 Spaces</option>
                            <option value={8}>8 Spaces</option>
                        </select>
                    </div>
                </div>

                {/* Main Editor UI */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="formatter-grid">
                    {/* Input */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Input</span>
                            <button onClick={() => setInput("")} className="btn btn-ghost btn-xs">Clear</button>
                        </div>
                        <textarea
                            className="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Paste your ${language.toUpperCase()} here...`}
                            rows={15}
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.8125rem",
                                width: "100%",
                                resize: "vertical",
                                minHeight: "350px",
                                background: "var(--bg-card)",
                            }}
                            spellCheck={false}
                        />
                    </div>

                    {/* Output */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Formatted</span>
                            {output && <CopyButton text={output} size="sm" />}
                        </div>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                minHeight: "350px",
                            }}
                        >
                            <textarea
                                className="input"
                                value={output}
                                readOnly
                                placeholder="Formatted code will appear here..."
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.8125rem",
                                    width: "100%",
                                    height: "100%",
                                    minHeight: "350px",
                                    resize: "none",
                                    background: "rgba(99, 102, 241, 0.02)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                    <button onClick={formatCode} className="btn btn-primary w-full">
                        ✨ Format Code
                    </button>
                </div>
            </div>

            <style>{`
                @media (max-width: 800px) {
                    .formatter-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </ToolPageLayout>
    );
}
