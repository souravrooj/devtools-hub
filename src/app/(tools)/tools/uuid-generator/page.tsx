"use client";

import { useState, useEffect } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

function generateUUIDv4(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    // Fallback for older browsers (unlikely with Next.js 15 requirements but good to have)
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default function UuidGeneratorPage() {
    const [count, setCount] = useState(10);
    const [uuids, setUuids] = useState<string[]>([]);
    const [uppercase, setUppercase] = useState(false);
    const [noHyphens, setNoHyphens] = useState(false);

    const generate = () => {
        const newUuids = Array.from({ length: count }, () => {
            let id = generateUUIDv4();
            if (noHyphens) id = id.replace(/-/g, "");
            if (uppercase) id = id.toUpperCase();
            return id;
        });
        setUuids(newUuids);
    };

    // Initial generation
    useEffect(() => {
        generate();
    }, []);

    return (
        <ToolPageLayout
            id="uuid-generator"
            title="UUID Generator"
            description="Generate RFC-compliant v4 UUIDs in bulk, instantly."
            icon="🆔"
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "1.25rem",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            >
                <div className="card" style={{ padding: "1.5rem" }}>
                    {/* Controls */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    color: "var(--text-secondary)",
                                }}
                            >
                                Number of UUIDs
                            </label>
                            <span
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    color: "var(--accent)",
                                }}
                            >
                                {count}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={100}
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            style={{ width: "100%", accentColor: "var(--accent)" }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "0.875rem",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={uppercase}
                                onChange={(e) => setUppercase(e.target.checked)}
                                style={{ accentColor: "var(--accent)" }}
                            />
                            Uppercase
                        </label>
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "0.875rem",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={noHyphens}
                                onChange={(e) => setNoHyphens(e.target.checked)}
                                style={{ accentColor: "var(--accent)" }}
                            />
                            No Hyphens
                        </label>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
                        <button onClick={generate} className="btn btn-primary" style={{ flex: 1 }}>
                            🎲 Generate New Batch
                        </button>
                        {uuids.length > 0 && (
                            <CopyButton text={uuids.join("\n")} label="Copy All" />
                        )}
                    </div>

                    {/* Result List */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            maxHeight: "400px",
                            overflowY: "auto",
                            paddingRight: "0.5rem",
                        }}
                    >
                        {uuids.map((id, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0.625rem 0.875rem",
                                    background: "rgba(99, 102, 241, 0.03)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius-md)",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.8125rem",
                                }}
                            >
                                <span style={{ color: "var(--text-primary)" }}>{id}</span>
                                <CopyButton text={id} size="sm" variant="ghost" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
}
