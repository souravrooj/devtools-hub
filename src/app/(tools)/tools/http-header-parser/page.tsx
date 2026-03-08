"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

export default function HTTPHeaderParser() {
    const [input, setInput] = useState("");

    const parsedHeaders = useMemo(() => {
        if (!input.trim()) return [];

        const lines = input.split(/\r?\n/);
        const headers: { key: string; value: string; description: string }[] = [];

        lines.forEach((line) => {
            const index = line.indexOf(":");
            if (index > 0) {
                const key = line.substring(0, index).trim();
                const value = line.substring(index + 1).trim();
                headers.push({
                    key,
                    value,
                    description: getHeaderDescription(key)
                });
            }
        });

        return headers;
    }, [input]);

    function getHeaderDescription(key: string): string {
        const descriptions: Record<string, string> = {
            "cache-control": "Specifies directives for caching mechanisms in both requests and responses.",
            "content-type": "Indicates the media type of the resource.",
            "content-length": "The size of the message body in bytes.",
            "server": "Contains information about the software used by the origin server.",
            "set-cookie": "Used to send a cookie from the server to the user agent.",
            "strict-transport-security": "Forces the browser to only communicate with the server over HTTPS.",
            "x-content-type-options": "Prevents the browser from MIME-sniffing the response.",
            "x-frame-options": "Indicates whether a browser should be allowed to render a page in a frame or iframe.",
            "x-xss-protection": "Enables the Cross-site scripting (XSS) filter for modern browsers.",
            "access-control-allow-origin": "Indicates whether the response can be shared with resources with the given origin.",
            "authorization": "Contains the credentials to authenticate a user agent with a server.",
            "user-agent": "Identifies the software agent originating the request.",
            "host": "Specifies the domain name of the server and the TCP port number.",
            "accept": "Indicates which content types the client is able to understand.",
            "accept-encoding": "List of compression algorithms that the client supports.",
            "connection": "Controls whether the network connection stays open after the current transaction finishes.",
            "referer": "The address of the previous web page from which a link to the currently requested page was followed.",
        };

        return descriptions[key.toLowerCase()] || "";
    }

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
            id="http-header-parser"
            title="HTTP Header Parser"
            description="Break down raw HTTP headers into a readable structure with explanations for common headers."
            icon="🔗"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                    {/* Input */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <label style={labelStyle}>Raw HTTP Headers</label>
                            <button onClick={() => setInput("")} className="btn btn-ghost btn-sm">Clear</button>
                        </div>
                        <textarea
                            className="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste raw headers here...&#10;Content-Type: application/json&#10;Cache-Control: no-cache..."
                            rows={8}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", resize: "vertical" }}
                        />
                    </div>

                    {/* Output Table */}
                    <div>
                        <label style={labelStyle}>Parsed Results ({parsedHeaders.length})</label>
                        {parsedHeaders.length > 0 ? (
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                                    <thead style={{ background: "var(--bg-muted)", textAlign: "left" }}>
                                        <tr>
                                            <th style={{ padding: "12px", borderBottom: "2px solid var(--border)", fontWeight: 600 }}>Header Name</th>
                                            <th style={{ padding: "12px", borderBottom: "2px solid var(--border)", fontWeight: 600 }}>Value</th>
                                            <th style={{ padding: "12px", borderBottom: "2px solid var(--border)", fontWeight: 600 }}>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parsedHeaders.map((header, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                                                <td style={{ padding: "12px", color: "var(--accent)", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                                                    {header.key}
                                                </td>
                                                <td style={{ padding: "12px", position: "relative" }}>
                                                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                                        <span style={{ fontFamily: "var(--font-mono)", wordBreak: "break-all" }}>{header.value}</span>
                                                        <CopyButton text={header.value} size="sm" variant="ghost" />
                                                    </div>
                                                </td>
                                                <td style={{ padding: "12px", color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                                                    {header.description || "—"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div
                                style={{
                                    padding: "3rem",
                                    textAlign: "center",
                                    background: "var(--bg-muted)",
                                    borderRadius: "var(--radius-lg)",
                                    color: "var(--text-muted)",
                                    border: "1px dashed var(--border)"
                                }}
                            >
                                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📋</div>
                                No headers parsed yet. Paste some raw HTTP headers above to begin.
                            </div>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "2rem",
                        padding: "1rem",
                        background: "rgba(99, 102, 241, 0.05)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)"
                    }}
                >
                    <span style={{ fontSize: "1.25rem" }}>🛡️</span>
                    <div>
                        <strong>Pro Tip:</strong> You can copy headers directly from the <strong>Network Tab</strong> in your browser's Developer Tools (Right-click a request &gt; Copy &gt; Copy response/request headers) and paste them here for analysis.
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
}
