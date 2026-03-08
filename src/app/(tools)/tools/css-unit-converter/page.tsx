"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

type Unit = "px" | "rem" | "em" | "pt" | "pc" | "percent";

export default function CSSUnitConverter() {
    const [baseSize, setBaseSize] = useState<string>("16");
    const [values, setValues] = useState<Record<Unit, string>>({
        px: "16",
        rem: "1",
        em: "1",
        pt: "12",
        pc: "1",
        percent: "100",
    });

    const updateAll = (value: string, fromUnit: Unit, currentBase: number) => {
        if (!value.trim() || isNaN(parseFloat(value))) {
            setValues({
                px: "",
                rem: "",
                em: "",
                pt: "",
                pc: "",
                percent: "",
            });
            return;
        }

        const num = parseFloat(value);
        let pxValue = 0;

        // Convert input to px first
        switch (fromUnit) {
            case "px": pxValue = num; break;
            case "rem": pxValue = num * currentBase; break;
            case "em": pxValue = num * currentBase; break;
            case "pt": pxValue = num * (4 / 3); break;
            case "pc": pxValue = num * 16; break;
            case "percent": pxValue = (num / 100) * currentBase; break;
        }

        setValues({
            px: fromUnit === "px" ? value : pxValue.toFixed(3).replace(/\.?0+$/, ""),
            rem: fromUnit === "rem" ? value : (pxValue / currentBase).toFixed(3).replace(/\.?0+$/, ""),
            em: fromUnit === "em" ? value : (pxValue / currentBase).toFixed(3).replace(/\.?0+$/, ""),
            pt: fromUnit === "pt" ? value : (pxValue * (3 / 4)).toFixed(3).replace(/\.?0+$/, ""),
            pc: fromUnit === "pc" ? value : (pxValue / 16).toFixed(3).replace(/\.?0+$/, ""),
            percent: fromUnit === "percent" ? value : ((pxValue / currentBase) * 100).toFixed(3).replace(/\.?0+$/, ""),
        });
    };

    const handleBaseChange = (newBase: string) => {
        setBaseSize(newBase);
        const b = parseFloat(newBase);
        if (!isNaN(b) && b > 0 && values.px) {
            updateAll(values.px, "px", b);
        }
    };

    const UnitInput = ({ label, unit, value }: { label: string; unit: Unit; value: string }) => (
        <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label
                    style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    {label} ({unit})
                </label>
                {value && <CopyButton text={value} size="sm" variant="ghost" />}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                    className="input"
                    value={value}
                    onChange={(e) => updateAll(e.target.value, unit, parseFloat(baseSize))}
                    placeholder="0"
                    style={{ fontFamily: "var(--font-mono)", flex: 1 }}
                />
            </div>
        </div>
    );

    return (
        <ToolPageLayout
            id="css-unit-converter"
            title="CSS Unit Converter"
            description="Convert between PX, REM, EM, PT and other CSS units with ease."
            icon="📏"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                {/* Configuration */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem",
                        background: "var(--bg-muted)",
                        borderRadius: "var(--radius-md)",
                        marginBottom: "2rem"
                    }}
                >
                    <div style={{ fontSize: "1.25rem" }}>⚙️</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>Base Font Size</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Common default is 16px (1rem = 16px).</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input
                            type="number"
                            className="input"
                            value={baseSize}
                            onChange={(e) => handleBaseChange(e.target.value)}
                            style={{ width: "80px", textAlign: "center" }}
                        />
                        <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>PX</span>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    <div>
                        <UnitInput label="Pixels" unit="px" value={values.px} />
                        <UnitInput label="Root EM" unit="rem" value={values.rem} />
                        <UnitInput label="Parent EM" unit="em" value={values.em} />
                    </div>
                    <div>
                        <UnitInput label="Points" unit="pt" value={values.pt} />
                        <UnitInput label="Picas" unit="pc" value={values.pc} />
                        <UnitInput label="Percentage" unit="percent" value={values.percent} />
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "1.5rem",
                        padding: "1rem",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)"
                    }}
                >
                    <span style={{ fontSize: "1rem" }}>💡</span>
                    <div>
                        <strong>How it works:</strong> Updates to any field will instantly recalculate all other units based on the defined <strong>Base Font Size</strong>.
                        REMs and Percentages are base-sensitive, while PT and PC use standard fixed ratios.
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
}
