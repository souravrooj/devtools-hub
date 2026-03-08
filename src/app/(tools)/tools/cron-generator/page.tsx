"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import cronstrue from "cronstrue";
import CopyButton from "@/components/ui/CopyButton";

export default function CronGenerator() {
    const [cron, setCron] = useState("* * * * *");
    const [presets] = useState([
        { label: "Every Minute", value: "* * * * *" },
        { label: "Every 5 Minutes", value: "*/5 * * * *" },
        { label: "Every Hour", value: "0 * * * *" },
        { label: "Every Day at Midnight", value: "0 0 * * *" },
        { label: "Every Week (Monday)", value: "0 0 * * 1" },
        { label: "Every Month (1st)", value: "0 0 1 * *" },
    ]);

    const description = useMemo(() => {
        try {
            return cronstrue.toString(cron);
        } catch (e) {
            return "Invalid cron expression";
        }
    }, [cron]);

    const isValid = useMemo(() => {
        try {
            cronstrue.toString(cron);
            return true;
        } catch (e) {
            return false;
        }
    }, [cron]);

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
            id="cron-generator"
            title="Cron Expression Generator"
            description="Create and debug crontab schedules with human-readable descriptions and common presets."
            icon="⏰"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                    {/* Input Area */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <label style={labelStyle}>Cron Expression</label>
                            {isValid && <CopyButton text={cron} size="sm" variant="ghost" />}
                        </div>
                        <input
                            className="input"
                            value={cron}
                            onChange={(e) => setCron(e.target.value)}
                            placeholder="* * * * *"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "1.25rem",
                                textAlign: "center",
                                letterSpacing: "0.2em",
                                color: isValid ? "var(--accent)" : "#ef4444"
                            }}
                        />

                        <div
                            style={{
                                marginTop: "1rem",
                                display: "flex",
                                gap: "0.5rem",
                                flexWrap: "wrap",
                                justifyContent: "center"
                            }}
                        >
                            {presets.map((p) => (
                                <button
                                    key={p.label}
                                    onClick={() => setCron(p.value)}
                                    className="btn btn-xs btn-ghost"
                                    style={{ border: "1px solid var(--border)", fontSize: "0.7rem" }}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description Output */}
                    <div
                        style={{
                            padding: "2rem",
                            background: isValid ? "rgba(99, 102, 241, 0.03)" : "rgba(239, 68, 68, 0.03)",
                            borderRadius: "var(--radius-lg)",
                            border: `2px solid ${isValid ? "var(--accent-muted)" : "rgba(239, 68, 68, 0.1)"}`,
                            textAlign: "center"
                        }}
                    >
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
                            {isValid ? "Human Readable Representation" : "Error"}
                        </div>
                        <div
                            style={{
                                fontSize: "1.125rem",
                                fontWeight: 600,
                                color: isValid ? "var(--text-primary)" : "#ef4444",
                                lineHeight: 1.5
                            }}
                        >
                            {description}
                        </div>
                    </div>

                    {/* Cheat Sheet */}
                    <div style={{ marginTop: "1rem" }}>
                        <label style={labelStyle}>Cron Format Quick Reference</label>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(5, 1fr)",
                                gap: "0.5rem",
                                textAlign: "center",
                                fontSize: "0.75rem",
                                color: "var(--text-muted)"
                            }}
                        >
                            <div style={{ padding: "0.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>*</div>
                                <div>Minute</div>
                                <div style={{ fontSize: "0.65rem" }}>(0-59)</div>
                            </div>
                            <div style={{ padding: "0.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>*</div>
                                <div>Hour</div>
                                <div style={{ fontSize: "0.65rem" }}>(0-23)</div>
                            </div>
                            <div style={{ padding: "0.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>*</div>
                                <div>Day</div>
                                <div style={{ fontSize: "0.65rem" }}>(1-31)</div>
                            </div>
                            <div style={{ padding: "0.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>*</div>
                                <div>Month</div>
                                <div style={{ fontSize: "0.65rem" }}>(1-12)</div>
                            </div>
                            <div style={{ padding: "0.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>*</div>
                                <div>Weekday</div>
                                <div style={{ fontSize: "0.65rem" }}>(0-6)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "2rem",
                        padding: "1rem",
                        background: "var(--bg-muted)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.5
                    }}
                >
                    <strong>💡 Tips:</strong> Use <code>*/5</code> for "every 5", <code>1-5</code> for ranges, or <code>1,3,5</code> for lists.
                    The format used here is the standard 5-part crontab format.
                </div>
            </div>
        </ToolPageLayout>
    );
}
