"use client";

import ToolPageLayout from "@/components/layout/ToolPageLayout";

export default function ApiDocsPage() {
    return (
        <ToolPageLayout
            id="api-docs"
            title="API Documentation"
            description="Use DevTools Hub programmatically via our free JSON API."
            icon="📡"
        >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Introduction</h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        DevTools Hub provides a public, read-only API to access tool metadata, categories, and real-time usage stats.
                        This API is free to use for building CLI tools, dashboards, or integrations.
                    </p>

                    <div style={{ padding: "1rem", background: "var(--bg-muted)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent)" }}>
                        <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--accent)" }}>Base URL</strong>
                        <code style={{ fontSize: "1rem" }}>{typeof window !== 'undefined' ? window.location.origin : 'https://devtools-hub.vercel.app'}/api</code>
                    </div>
                </div>

                {/* Endpoint 1 */}
                <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <span className="badge badge-success" style={{ padding: "0.5rem 1rem" }}>GET</span>
                        <code style={{ fontSize: "1.125rem", fontWeight: 700 }}>/tools</code>
                    </div>
                    <p style={{ marginBottom: "1.5rem" }}>Returns a complete list of all registered tools, their availability status, and current view counts.</p>

                    <h3 style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Response Body</h3>
                    <pre className="code-block" style={{ fontSize: "0.8125rem" }}>
                        {`{
  "success": true,
  "data": {
    "tools": [
      {
        "id": "json-formatter",
        "name": "JSON Formatter",
        "description": "...",
        "category": "formatting",
        "available": true,
        "viewCount": 1250
      },
      ...
    ],
    "categories": [...],
    "counts": {
      "total": 12,
      "available": 10,
      "comingSoon": 2
    }
  }
}`}
                    </pre>
                </div>

                {/* Rate Limiting */}
                <div className="card" style={{ padding: "2rem" }}>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Rate Limiting & Usage</h2>
                    <p style={{ margin: 0 }}>
                        Currently, the API is open and does not require an API key. However, we ask that you respect our
                        resources by limiting requests to a reasonable frequency. Abuse may result in IP-based blocking.
                    </p>
                </div>
            </div>
        </ToolPageLayout>
    );
}
