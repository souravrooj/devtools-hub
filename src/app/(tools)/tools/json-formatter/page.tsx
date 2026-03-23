import { useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";
import ResizableLayout from "@/components/ui/ResizableLayout";
import { safeParseJSON, prettyJSON } from "@/lib/utils";

export default function JsonFormatterPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleFormat = () => {
        if (!input.trim()) {
            setOutput("");
            setError(null);
            return;
        }
        const { data, error: parseError } = safeParseJSON(input);
        if (parseError) {
            setError(parseError);
            setOutput("");
        } else {
            setError(null);
            setOutput(prettyJSON(data));
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError(null);
    };

    // Auto-format on paste
    const handlePaste = () => {
        setTimeout(() => {
            const el = document.getElementById("json-input") as HTMLTextAreaElement;
            if (el) {
                const val = el.value;
                setInput(val);
                const { data, error: parseError } = safeParseJSON(val);
                if (parseError) {
                    setError(parseError);
                    setOutput("");
                } else {
                    setError(null);
                    setOutput(prettyJSON(data));
                }
            }
        }, 0);
    };

    const leftPanel = (
        <div
            className="card"
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.25rem",
                height: "100%",
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
                <label
                    htmlFor="json-input"
                    style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Input
                </label>
                <button onClick={handleClear} className="btn btn-ghost btn-sm">
                    Clear
                </button>
            </div>
            <textarea
                id="json-input"
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPaste={handlePaste}
                placeholder='Paste your JSON here...\n\nExample: {"name":"John","age":30}'
                style={{
                    flex: 1,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    resize: "none",
                    minHeight: "320px",
                }}
            />
            <div
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "0.75rem",
                }}
            >
                <button onClick={handleFormat} className="btn btn-primary">
                    Format JSON
                </button>
            </div>
        </div>
    );

    const rightPanel = (
        <div
            className="card"
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.25rem",
                height: "100%",
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
                    Output
                </span>
                {output && <CopyButton text={output} size="sm" />}
            </div>

            {error ? (
                <div
                    style={{
                        background: "rgb(239 68 68 / 0.08)",
                        border: "1px solid rgb(239 68 68 / 0.25)",
                        borderRadius: "var(--radius-md)",
                        padding: "1rem",
                        flex: 1,
                        color: "#ef4444",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        wordBreak: "break-word",
                    }}
                >
                    <strong>❌ Invalid JSON</strong>
                    <br />
                    {error}
                </div>
            ) : (
                <pre
                    className="code-block"
                    style={{
                        flex: 1,
                        margin: 0,
                        minHeight: "320px",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {output || (
                        <span style={{ color: "var(--text-muted)" }}>
                            Formatted JSON will appear here...
                        </span>
                    )}
                </pre>
            )}
        </div>
    );

    return (
        <ToolPageLayout
            id="json-formatter"
            title="JSON Formatter"
            description="Paste raw JSON and get a beautifully formatted, validated version."
            icon="🧱"
        >
            <ResizableLayout left={leftPanel} right={rightPanel} />
        </ToolPageLayout>
    );
}
