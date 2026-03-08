"use client";

import { useState, useEffect } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

export default function AspectRatioCalculator() {
    const [width, setWidth] = useState<string>("1920");
    const [height, setHeight] = useState<string>("1080");
    const [ratioW, setRatioW] = useState<string>("16");
    const [ratioH, setRatioH] = useState<string>("9");

    // Helper to calculate GCD
    const getGCD = (a: number, b: number): number => {
        return b === 0 ? a : getGCD(b, a % b);
    };

    const updateFromDimensions = (w: string, h: string) => {
        const numW = parseFloat(w);
        const numH = parseFloat(h);

        if (!isNaN(numW) && !isNaN(numH) && numW > 0 && numH > 0) {
            const gcd = getGCD(numW, numH);
            setRatioW((numW / gcd).toString());
            setRatioH((numH / gcd).toString());
        }
    };

    const updateWidth = (h: string, rW: string, rH: string) => {
        const numH = parseFloat(h);
        const numRW = parseFloat(rW);
        const numRH = parseFloat(rH);

        if (!isNaN(numH) && !isNaN(numRW) && !isNaN(numRH) && numRH > 0) {
            setWidth(((numH * numRW) / numRH).toFixed(0));
        }
    };

    const updateHeight = (w: string, rW: string, rH: string) => {
        const numW = parseFloat(w);
        const numRW = parseFloat(rW);
        const numRH = parseFloat(rH);

        if (!isNaN(numW) && !isNaN(numRW) && !isNaN(numRH) && numRW > 0) {
            setHeight(((numW * numRH) / numRW).toFixed(0));
        }
    };

    const handlePreset = (rw: number, rh: number) => {
        setRatioW(rw.toString());
        setRatioH(rh.toString());
        if (width) {
            setHeight(((parseFloat(width) * rh) / rw).toFixed(0));
        } else if (height) {
            setWidth(((parseFloat(height) * rw) / rh).toFixed(0));
        }
    };

    const inputGroupStyle = {
        flex: 1,
        marginBottom: "1rem"
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

    const presets = [
        { label: "16:9 (HD)", w: 16, h: 9 },
        { label: "4:3 (SD)", w: 4, h: 3 },
        { label: "1:1 (Square)", w: 1, h: 1 },
        { label: "21:9 (Ultrawide)", w: 21, h: 9 },
        { label: "9:16 (Story)", w: 9, h: 16 },
        { label: "3:2 (Photo)", w: 3, h: 2 },
    ];

    return (
        <ToolPageLayout
            id="aspect-ratio-calculator"
            title="Aspect Ratio Calculator"
            description="Calculate dimensions and aspect ratios for images, video, and design projects."
            icon="📐"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "840px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
                    {/* Controls */}
                    <div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Width (px)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={width}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setWidth(val);
                                        updateHeight(val, ratioW, ratioH);
                                    }}
                                    placeholder="Width"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Height (px)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={height}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setHeight(val);
                                        updateWidth(val, ratioW, ratioH);
                                    }}
                                    placeholder="Height"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Ratio W</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={ratioW}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setRatioW(val);
                                        updateHeight(width, val, ratioH);
                                    }}
                                    placeholder="R-W"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                />
                            </div>
                            <div style={{ marginBottom: "1.75rem", fontSize: "1.25rem", color: "var(--text-muted)" }}>:</div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Ratio H</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={ratioH}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setRatioH(val);
                                        updateWidth(height, ratioW, val);
                                    }}
                                    placeholder="R-H"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: "2rem" }}>
                            <label style={labelStyle}>Common Presets</label>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem" }}>
                                {presets.map((p) => (
                                    <button
                                        key={p.label}
                                        onClick={() => handlePreset(p.w, p.h)}
                                        className={`btn btn-sm btn-ghost`}
                                        style={{ justifyContent: "space-between", fontSize: "0.75rem", border: "1px solid var(--border)" }}
                                    >
                                        <span>{p.label}</span>
                                        <span style={{ color: "var(--accent)" }}>{p.w}:{p.h}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Visualization */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div
                            style={{
                                width: "100%",
                                aspectRatio: `${ratioW} / ${ratioH}`,
                                background: "var(--accent-muted)",
                                border: "2px dashed var(--accent)",
                                borderRadius: "var(--radius-md)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                transition: "aspect-ratio 300ms ease",
                                position: "relative"
                            }}
                        >
                            <div style={{ textAlign: "center", color: "var(--accent-text)", fontWeight: 700 }}>
                                <div style={{ fontSize: "1.25rem" }}>{ratioW}:{ratioH}</div>
                                <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>{width} x {height}</div>
                            </div>

                            {/* Decorative lines */}
                            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "var(--accent)", opacity: 0.1 }} />
                            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "var(--accent)", opacity: 0.1 }} />
                        </div>

                        <div style={{ marginTop: "2rem", width: "100%", padding: "1rem", background: "rgba(99, 102, 241, 0.05)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                            <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "var(--text-primary)" }}>Ratio Summary</h4>
                            <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                Current aspect ratio is <strong>{ratioW}:{ratioH}</strong>. <br />
                                For every <strong>{ratioW}</strong> units of width, there are <strong>{ratioH}</strong> units of height. <br />
                                Scale Factor: <strong>{(parseFloat(width) / parseFloat(ratioW)).toFixed(2)}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
}
