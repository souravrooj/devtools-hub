"use client";

import { useState, useEffect } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

export default function TimestampConverterPage() {
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [inputValue, setInputValue] = useState(Math.floor(Date.now() / 1000).toString());
    const [isSeconds, setIsSeconds] = useState(true);

    // Live Clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const dateSpecs = (() => {
        try {
            let num = parseInt(inputValue);
            if (isNaN(num)) return null;

            // Handle auto-detection or explicit mode
            // If length is 13+ it's likely ms
            const actualMs = isSeconds ? num * 1000 : num;
            const d = new Date(actualMs);

            if (isNaN(d.getTime())) return null;

            return {
                seconds: Math.floor(actualMs / 1000).toString(),
                milliseconds: actualMs.toString(),
                iso: d.toISOString(),
                utc: d.toUTCString(),
                local: d.toLocaleString(),
                dateOnly: d.toLocaleDateString(),
                day: d.toLocaleDateString(undefined, { weekday: "long" }),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };
        } catch {
            return null;
        }
    })();

    const useCurrentTime = () => {
        setInputValue(isSeconds ? Math.floor(Date.now() / 1000).toString() : Date.now().toString());
    };

    return (
        <ToolPageLayout
            id="timestamp-converter"
            title="Timestamp Converter"
            description="Convert Unix timestamps to human-readable dates across timezones — with live current time."
            icon="⏱️"
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "1.5rem",
                    maxWidth: "800px",
                    margin: "0 auto",
                }}
            >
                {/* Live Current Time Dashboard */}
                <div
                    className="card"
                    style={{
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))",
                        borderColor: "rgba(99, 102, 241, 0.2)",
                    }}
                >
                    <div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                            Current Unix Timestamp
                        </div>
                        <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                            {Math.floor(currentTime / 1000)}
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                            {new Date(currentTime).toLocaleString()}
                        </div>
                        <button onClick={useCurrentTime} className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>
                            🚀 Apply to converter
                        </button>
                    </div>
                </div>

                <div className="card" style={{ padding: "1.5rem" }}>
                    {/* Input */}
                    <div style={{ marginBottom: "2rem" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                marginBottom: "0.75rem",
                                color: "var(--text-secondary)",
                            }}
                        >
                            Enter Unix Timestamp
                        </label>
                        <div style={{ display: "flex", gap: "0.75rem" }}>
                            <input
                                className="input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ""))}
                                placeholder="e.g. 1709865000"
                                style={{
                                    flex: 1,
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "1.125rem",
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    gap: "1px",
                                    background: "var(--bg-muted)",
                                    padding: "2px",
                                    borderRadius: "var(--radius-md)",
                                }}
                            >
                                <button
                                    onClick={() => setIsSeconds(true)}
                                    className={`btn btn-xs ${isSeconds ? "btn-primary" : "btn-ghost"}`}
                                    style={{ borderRadius: "var(--radius-sm)", width: "64px" }}
                                >
                                    sec
                                </button>
                                <button
                                    onClick={() => setIsSeconds(false)}
                                    className={`btn btn-xs ${!isSeconds ? "btn-primary" : "btn-ghost"}`}
                                    style={{ borderRadius: "var(--radius-sm)", width: "64px" }}
                                >
                                    ms
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    {dateSpecs ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                            }}
                        >
                            {[
                                { label: "Seconds", value: dateSpecs.seconds },
                                { label: "Milliseconds", value: dateSpecs.milliseconds },
                                { label: "ISO 8601", value: dateSpecs.iso },
                                { label: "UTC String", value: dateSpecs.utc },
                                { label: "Local Time", value: `${dateSpecs.local} (${dateSpecs.timezone})` },
                                { label: "Day of Week", value: dateSpecs.day },
                            ].map((row, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "0.875rem",
                                        background: "rgba(99, 102, 241, 0.03)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "var(--radius-md)",
                                    }}
                                >
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.125rem" }}>
                                            {row.label}
                                        </span>
                                        <span style={{ fontSize: "0.9375rem", color: "var(--text-primary)", fontFamily: row.label.includes('Unix') ? 'var(--font-mono)' : 'inherit' }}>
                                            {row.value}
                                        </span>
                                    </div>
                                    <CopyButton text={row.value.split(' (')[0]} size="sm" variant="ghost" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                            Enter a valid numeric timestamp above to see conversion results.
                        </div>
                    )}
                </div>
            </div>
        </ToolPageLayout>
    );
}
