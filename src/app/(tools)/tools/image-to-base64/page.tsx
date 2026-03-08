"use client";

import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

export default function ImageToBase64() {
    const [image, setImage] = useState<string | null>(null);
    const [base64, setBase64] = useState<string>("");
    const [info, setInfo] = useState<{ name: string; size: string; type: string } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [tab, setTab] = useState<"toBase64" | "toImage">("toBase64");

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setImage(result);
            setBase64(result);
            setInfo({
                name: file.name,
                size: formatSize(file.size),
                type: file.type
            });
        };
        reader.readAsDataURL(file);
    };

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    }, []);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
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
            id="image-to-base64"
            title="Image ↔ Base64 Converter"
            description="Convert images to Base64 data strings for CSS/HTML or decode Base64 strings back to images."
            icon="🖼️"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
                {/* Tab switcher */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
                    <button
                        onClick={() => setTab("toBase64")}
                        style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: tab === "toBase64" ? "var(--accent)" : "var(--text-muted)",
                            borderBottom: tab === "toBase64" ? "2px solid var(--accent)" : "2px solid transparent",
                            background: "none",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                    >
                        Image to Base64
                    </button>
                    <button
                        onClick={() => setTab("toImage")}
                        style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: tab === "toImage" ? "var(--accent)" : "var(--text-muted)",
                            borderBottom: tab === "toImage" ? "2px solid var(--accent)" : "2px solid transparent",
                            background: "none",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                    >
                        Base64 to Image
                    </button>
                </div>

                {tab === "toBase64" ? (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                        {/* Dropzone & Preview */}
                        <div>
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={onDrop}
                                style={{
                                    border: `2px dashed ${isDragging ? "var(--accent)" : "var(--border)"}`,
                                    borderRadius: "var(--radius-lg)",
                                    padding: "2rem",
                                    textAlign: "center",
                                    background: isDragging ? "var(--accent-muted)" : "transparent",
                                    transition: "all 0.2s",
                                    cursor: "pointer",
                                    position: "relative",
                                    minHeight: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                                />
                                {image ? (
                                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <img src={image} alt="Preview" style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "var(--radius-md)", marginBottom: "1rem" }} />
                                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Click or drag to change image</div>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📁</div>
                                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>Drop image here or click to browse</div>
                                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Supports PNG, JPG, SVG, WEBP, GIF</div>
                                    </>
                                )}
                            </div>

                            {info && (
                                <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--bg-muted)", borderRadius: "var(--radius-md)", fontSize: "0.8125rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                        <span style={{ color: "var(--text-muted)" }}>Filename:</span>
                                        <span style={{ fontWeight: 600 }}>{info.name}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                        <span style={{ color: "var(--text-muted)" }}>Size:</span>
                                        <span style={{ fontWeight: 600 }}>{info.size}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ color: "var(--text-muted)" }}>Type:</span>
                                        <span style={{ fontWeight: 600 }}>{info.type}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Base64 Output */}
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                <label style={labelStyle}>Base64 Data URI</label>
                                {base64 && <CopyButton text={base64} size="sm" variant="ghost" />}
                            </div>
                            <textarea
                                className="input"
                                value={base64}
                                readOnly
                                placeholder="Base64 result will appear here..."
                                rows={10}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.75rem",
                                    resize: "none",
                                    background: "var(--bg-muted)"
                                }}
                            />
                            <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                                💡 <strong>Tip:</strong> Use this string in your CSS like: <br />
                                <code style={{ color: "var(--accent)" }}>background-image: url("data:image/...");</code>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                        <div>
                            <label style={labelStyle}>Base64 String</label>
                            <textarea
                                className="input"
                                value={base64}
                                onChange={(e) => setBase64(e.target.value)}
                                placeholder="Paste your Base64 image string here..."
                                rows={12}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.75rem",
                                    resize: "vertical"
                                }}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Image Preview</label>
                            <div
                                style={{
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius-lg)",
                                    minHeight: "260px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "repeating-conic-gradient(var(--border) 0% 25%, transparent 0% 50%) 50% / 16px 16px",
                                    overflow: "hidden"
                                }}
                            >
                                {base64 ? (
                                    <img
                                        src={base64.startsWith("data:") ? base64 : `data:image/png;base64,${base64}`}
                                        alt="Base64 Preview"
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                    />
                                ) : (
                                    <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Image will appear here</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolPageLayout>
    );
}
