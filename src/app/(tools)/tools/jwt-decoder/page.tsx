"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import { jwtDecode } from "jwt-decode";
import CopyButton from "@/components/ui/CopyButton";

export default function JWTDecoder() {
    const [token, setToken] = useState("");

    const decoded = useMemo(() => {
        if (!token.trim()) return { header: null, payload: null, error: null };

        try {
            // jwt-decode doesn't give the header easily in one go, so we manually decode parts if needed
            // but for payload it's perfect
            const payload = jwtDecode(token);

            // For header, we can split and atob
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

    const sectionStyle = {
        marginBottom: "2rem"
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

    return (
        <ToolPageLayout
            id="jwt-decoder"
            title="JWT Decoder"
            description="Decode JSON Web Tokens instantly and securely. Inspect your token's header and payload."
            icon="🔑"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    {/* Input */}
                    <div>
                        <div style={sectionStyle}>
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
                                rows={10}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.875rem",
                                    resize: "vertical"
                                }}
                            />
                        </div>

                        {decoded.error && (
                            <div
                                style={{
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

                    {/* Output */}
                    <div>
                        <div style={sectionStyle}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                <label style={labelStyle}>Header (Algorithm & Type)</label>
                                {decoded.header && <CopyButton text={formatJSON(decoded.header)} size="sm" variant="ghost" />}
                            </div>
                            <pre className="code-block" style={{ minHeight: "100px", color: "#6366f1" }}>
                                {decoded.header ? formatJSON(decoded.header) : "Waiting for token..."}
                            </pre>
                        </div>

                        <div style={sectionStyle}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                <label style={labelStyle}>Payload (Data)</label>
                                {decoded.payload && <CopyButton text={formatJSON(decoded.payload)} size="sm" variant="ghost" />}
                            </div>
                            <pre className="code-block" style={{ minHeight: "200px" }}>
                                {decoded.payload ? formatJSON(decoded.payload) : "Waiting for token..."}
                            </pre>
                        </div>
                    </div>
                </div>

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
