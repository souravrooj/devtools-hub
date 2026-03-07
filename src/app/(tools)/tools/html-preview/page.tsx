"use client";

import { useState, useEffect } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 2rem; color: #333; }
        h1 { color: #6366f1; }
        .btn { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; transition: 0.2s; }
        .btn:hover { background: #4f46e5; }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a live HTML preview sandbox.</p>
    <button class="btn" onclick="alert('Button Clicked!')">Click Me</button>
</body>
</html>`;

export default function HtmlPreviewPage() {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(code);
        }, 500); // 500ms debounce
        return () => clearTimeout(timeout);
    }, [code]);

    return (
        <ToolPageLayout
            id="html-preview"
            title="HTML Preview"
            description="Write HTML, CSS, and JS and see a live rendered preview in a real-time sandbox."
            icon="🖼️"
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                    height: "calc(100vh - 350px)",
                    minHeight: "500px",
                }}
                className="html-preview-grid"
            >
                {/* Editor */}
                <div className="card" style={{ padding: "1rem", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                            Source Editor
                        </span>
                        <button onClick={() => setCode("")} className="btn btn-ghost btn-xs">Clear</button>
                    </div>
                    <textarea
                        className="input"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your HTML code here..."
                        style={{
                            flex: 1,
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.875rem",
                            resize: "none",
                            lineHeight: 1.5,
                            padding: "1rem",
                        }}
                        spellCheck={false}
                    />
                </div>

                {/* Sandbox */}
                <div className="card" style={{ padding: "1rem", display: "flex", flexDirection: "column", background: "white", overflow: "hidden" }}>
                    <div style={{ marginBottom: "0.5rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }}></div>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }}></div>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }}></div>
                        <span style={{ fontSize: "0.8125rem", color: "#94a3b8", marginLeft: "1rem", fontFamily: "var(--font-mono)" }}>
                            Preview Sandbox
                        </span>
                    </div>
                    <iframe
                        srcDoc={srcDoc}
                        title="HTML Preview Sandbox"
                        sandbox="allow-scripts allow-modals allow-forms allow-popups"
                        style={{
                            width: "100%",
                            flex: 1,
                            border: "none",
                            background: "white",
                        }}
                    />
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .html-preview-grid {
                        grid-template-columns: 1fr !important;
                        height: auto !important;
                    }
                }
            `}</style>
        </ToolPageLayout>
    );
}
