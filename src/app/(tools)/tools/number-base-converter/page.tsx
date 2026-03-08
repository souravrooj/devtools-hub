"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

export default function NumberBaseConverter() {
    const [decimal, setDecimal] = useState("");
    const [hex, setHex] = useState("");
    const [binary, setBinary] = useState("");
    const [octal, setOctal] = useState("");
    const [custom, setCustom] = useState("");
    const [customBase, setCustomBase] = useState("12");

    const updateAll = (value: string, fromBase: number) => {
        if (!value.trim()) {
            setDecimal("");
            setHex("");
            setBinary("");
            setOctal("");
            setCustom("");
            return;
        }

        try {
            const num = parseInt(value, fromBase);
            if (isNaN(num)) return;

            if (fromBase !== 10) setDecimal(num.toString(10));
            if (fromBase !== 16) setHex(num.toString(16).toUpperCase());
            if (fromBase !== 2) setBinary(num.toString(2));
            if (fromBase !== 8) setOctal(num.toString(8));
            if (fromBase !== parseInt(customBase)) setCustom(num.toString(parseInt(customBase)).toUpperCase());
        } catch (e) {
            // Silently fail on invalid input
        }
    };

    const handleDecimalChange = (val: string) => {
        setDecimal(val);
        updateAll(val, 10);
    };

    const handleHexChange = (val: string) => {
        setHex(val);
        updateAll(val, 16);
    };

    const handleBinaryChange = (val: string) => {
        setBinary(val);
        updateAll(val, 2);
    };

    const handleOctalChange = (val: string) => {
        setOctal(val);
        updateAll(val, 8);
    };

    const handleCustomChange = (val: string) => {
        setCustom(val);
        updateAll(val, parseInt(customBase));
    };

    const handleCustomBaseChange = (base: string) => {
        setCustomBase(base);
        const b = parseInt(base);
        if (!isNaN(b) && b >= 2 && b <= 36 && decimal) {
            setCustom(parseInt(decimal).toString(b).toUpperCase());
        }
    };

    const inputGroupStyle = {
        marginBottom: "1.5rem",
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
            id="number-base-converter"
            title="Number Base Converter"
            description="Convert numbers between Decimal, Hexadecimal, Binary, Octal, and custom bases."
            icon="🔢"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    {/* Primary Bases */}
                    <div>
                        <div style={inputGroupStyle}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label style={labelStyle}>Decimal (Base 10)</label>
                                {decimal && <CopyButton text={decimal} size="sm" variant="ghost" />}
                            </div>
                            <input
                                className="input"
                                value={decimal}
                                onChange={(e) => handleDecimalChange(e.target.value)}
                                placeholder="e.g. 255"
                                style={{ fontFamily: "var(--font-mono)" }}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label style={labelStyle}>Hexadecimal (Base 16)</label>
                                {hex && <CopyButton text={hex} size="sm" variant="ghost" />}
                            </div>
                            <input
                                className="input"
                                value={hex}
                                onChange={(e) => handleHexChange(e.target.value)}
                                placeholder="e.g. FF"
                                style={{ fontFamily: "var(--font-mono)" }}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label style={labelStyle}>Octal (Base 8)</label>
                                {octal && <CopyButton text={octal} size="sm" variant="ghost" />}
                            </div>
                            <input
                                className="input"
                                value={octal}
                                onChange={(e) => handleOctalChange(e.target.value)}
                                placeholder="e.g. 377"
                                style={{ fontFamily: "var(--font-mono)" }}
                            />
                        </div>
                    </div>

                    {/* Binary and Custom */}
                    <div>
                        <div style={inputGroupStyle}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label style={labelStyle}>Binary (Base 2)</label>
                                {binary && <CopyButton text={binary} size="sm" variant="ghost" />}
                            </div>
                            <textarea
                                className="input"
                                value={binary}
                                onChange={(e) => handleBinaryChange(e.target.value)}
                                placeholder="e.g. 11111111"
                                rows={3}
                                style={{ fontFamily: "var(--font-mono)", resize: "vertical" }}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <label style={{ ...labelStyle, marginBottom: 0 }}>Custom Base</label>
                                    <input
                                        type="number"
                                        min="2"
                                        max="36"
                                        value={customBase}
                                        onChange={(e) => handleCustomBaseChange(e.target.value)}
                                        className="input"
                                        style={{ width: "60px", padding: "2px 8px", fontSize: "0.8125rem", height: "28px" }}
                                    />
                                </div>
                                {custom && <CopyButton text={custom} size="sm" variant="ghost" />}
                            </div>
                            <input
                                className="input"
                                value={custom}
                                onChange={(e) => handleCustomChange(e.target.value)}
                                placeholder={`Base ${customBase} value...`}
                                style={{ fontFamily: "var(--font-mono)" }}
                            />
                        </div>

                        <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--bg-muted)", borderRadius: "var(--radius-md)", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                            <p style={{ margin: 0 }}>
                                💡 <strong>Tip:</strong> You can enter a value in any field to see its conversion in all other bases instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
}
