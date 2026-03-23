"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import { jwtDecode } from "jwt-decode";
import CopyButton from "@/components/ui/CopyButton";
import ResizableLayout from "@/components/ui/ResizableLayout";

export default function JWTDecoder() {
    const [token, setToken] = useState("");

    const decoded = useMemo(() => {
        if (!token.trim()) return { header: null, payload: null, error: null };

        try {
            const payload = jwtDecode(token);
            const parts = token.split(".");
            let header = null;
            if (parts.length > 0) {
                try {
                    header = JSON.parse(atob(parts[0]));
                } catch (e) {
                    // Ignore header error
                }
            }

            return { header, payload, error: null };
        } catch (e: any) {
            return { header: null, payload: null, error: e.message || "Invalid JWT format" };
        }
    }, [token]);

    const formatJSON = (obj: any) => {
        return JSON.stringify(obj, null, 4);
    };

    const isExpired = (payload: any) => {
        if (!payload || !payload.exp) return null;
        const exp = payload.exp * 1000;
        return Date.now() > exp;
    };

    const getExpDate = (payload: any) => {
        if (!payload || !payload.exp) return null;
        return new Date(payload.exp * 1000).toLocaleString();
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
                <label style={labelStyle}>Encoded Token</label>
                <button
                    onClick={() => setToken("")}
                    className="btn btn-ghost btn-sm"
                    style={{ padding: "2px 8px" }}
                >
                    Clear
                </button>
            </div>
            <textarea
                className="input"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your JWT here (header.payload.signature)..."
                style={{
                    flex: 1,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    resize: "none",
                    minHeight: "400px"
                }}
            />
            {decoded.error && (
                <div
                    style={{
                        marginTop: "1rem",
                        padding: "1rem",
                        background: "rgb(239 68 68 / 0.08)",
                        border: "1px solid rgb(239 68 68 / 0.25)",
                        borderRadius: "var(--radius-md)",
                        color: "#ef4444",
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-mono)"
                    }}
                >
                    ❌ {decoded.error}
                </div>
            )}
            {!decoded.error && decoded.payload && (
                <div style={{ marginTop: "1rem" }}>
                    <div
                        className={`badge ${isExpired(decoded.payload) ? "badge-warning" : "badge-success"}`}
                        style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                    >
                        {isExpired(decoded.payload) ? "⚠️ Token Expired" : "✓ Token is active"}
                    </div>
                    {decoded.payload.exp && (
                        <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            Expires at: {getExpDate(decoded.payload)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const rightPanel = (
        <div className="card" style={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={labelStyle}>Header</label>
                    {decoded.header && <CopyButton text={formatJSON(decoded.header)} size="sm" variant="ghost" />}
                </div>
                <pre className="code-block" style={{ minHeight: "100px", color: "var(--accent)" }}>
                    {decoded.header ? formatJSON(decoded.header) : "Waiting for token..."}
                </pre>
            </div>

            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={labelStyle}>Payload</label>
                    {decoded.payload && <CopyButton text={formatJSON(decoded.payload)} size="sm" variant="ghost" />}
                </div>
                <pre className="code-block" style={{ minHeight: "200px" }}>
                    {decoded.payload ? formatJSON(decoded.payload) : "Waiting for token..."}
                </pre>
            </div>
        </div>
    );

    return (
        <ToolPageLayout
            id="jwt-decoder"
            title="JWT Decoder"
            description="Decode JSON Web Tokens instantly and securely. Inspect your token's header and payload."
            icon="🔑"
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <ResizableLayout left={leftPanel} right={rightPanel} />

                <div
                    style={{
                        marginTop: "1.5rem",
                        padding: "1rem",
                        background: "var(--bg-muted)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)"
                    }}
                >
                    <span>🛡️</span>
                    <div>
                        <strong>Privacy Note:</strong> Tokens are decoded locally in your browser using the <code>jwt-decode</code> library. No data is ever sent to our servers or any 3rd-party.
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
}
