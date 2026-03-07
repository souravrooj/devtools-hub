"use client";

import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import { randomHexColor, isLightColor } from "@/lib/utils";
import { useClipboard } from "@/hooks/useClipboard";

interface PaletteColor {
    hex: string;
    locked: boolean;
}

function generatePalette(existing?: PaletteColor[]): PaletteColor[] {
    return Array.from({ length: 5 }, (_, i) => {
        if (existing && existing[i]?.locked) return existing[i];
        return { hex: randomHexColor(), locked: false };
    });
}

export default function ColorPalettePage() {
    const [palette, setPalette] = useState<PaletteColor[]>(() =>
        generatePalette()
    );
    const { copied, copy } = useClipboard();
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const regenerate = useCallback(() => {
        setPalette((prev) => generatePalette(prev));
    }, []);

    const toggleLock = (idx: number) => {
        setPalette((prev) =>
            prev.map((c, i) => (i === idx ? { ...c, locked: !c.locked } : c))
        );
    };

    const copyColor = async (hex: string, idx: number) => {
        await copy(hex);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    return (
        <ToolPageLayout
            title="Color Palette Generator"
            description="Generate beautiful random color palettes with hex codes ready to copy."
            icon="🎨"
        >
            {/* Action bar */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                }}
            >
                <button className="btn btn-primary" onClick={regenerate}>
                    🎲 Generate New Palette
                </button>
            </div>

            {/* Palette display */}
            <div
                className="card"
                style={{
                    overflow: "hidden",
                    padding: 0,
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        minHeight: "350px",
                    }}
                    className="palette-grid"
                >
                    {palette.map((color, idx) => {
                        const light = isLightColor(color.hex);
                        const textColor = light ? "#0f172a" : "#f8fafc";

                        return (
                            <div
                                key={idx}
                                style={{
                                    background: color.hex,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.75rem",
                                    padding: "1.5rem 1rem",
                                    cursor: "pointer",
                                    position: "relative",
                                    transition: "all 200ms ease",
                                }}
                                onClick={() => copyColor(color.hex, idx)}
                                title={`Click to copy ${color.hex}`}
                            >
                                {/* Lock button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLock(idx);
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        background: "rgba(0,0,0,0.15)",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "32px",
                                        height: "32px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        color: textColor,
                                        fontSize: "14px",
                                        transition: "background 150ms",
                                        backdropFilter: "blur(4px)",
                                    }}
                                    title={color.locked ? "Unlock this color" : "Lock this color"}
                                >
                                    {color.locked ? "🔒" : "🔓"}
                                </button>

                                {/* Hex code */}
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "1.125rem",
                                        fontWeight: 700,
                                        color: textColor,
                                        letterSpacing: "0.02em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {copiedIdx === idx ? "Copied!" : color.hex}
                                </span>

                                {/* Light/Dark indicator */}
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 500,
                                        color: textColor,
                                        opacity: 0.7,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {light ? "Light" : "Dark"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Color list (text format) */}
            <div
                className="card"
                style={{
                    marginTop: "1.25rem",
                    padding: "1.25rem",
                    maxWidth: "640px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.75rem",
                    }}
                >
                    <span
                        style={{
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                            color: "var(--text-secondary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        CSS Variables
                    </span>
                </div>
                <pre className="code-block" style={{ margin: 0 }}>
                    {palette
                        .map(
                            (c, i) =>
                                `--color-${i + 1}: ${c.hex};`
                        )
                        .join("\n")}
                </pre>
            </div>

            {/* Responsive */}
            <style>{`
        @media (max-width: 640px) {
          .palette-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .palette-grid > div {
            min-height: 100px;
          }
        }
      `}</style>
        </ToolPageLayout>
    );
}
