"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

export default function RegexTesterPage() {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState({
        g: true,
        i: false,
        m: false,
        s: false,
        u: false,
        y: false,
    });
    const [testText, setTestText] = useState("");

    const activeFlags = Object.entries(flags)
        .filter(([_, active]) => active)
        .map(([flag]) => flag)
        .join("");

    const results = useMemo(() => {
        if (!pattern) return { matches: [], highlightedHtml: escape(testText), error: null };

        try {
            const re = new RegExp(pattern, activeFlags);
            const foundMatches = [];

            if (activeFlags.includes("g")) {
                let match;
                while ((match = re.exec(testText)) !== null) {
                    foundMatches.push(match);
                    // Prevent infinite loop on zero-length matches
                    if (match[0].length === 0) {
                        re.lastIndex++;
                    }
                    if (re.lastIndex > testText.length) break;
                }
            } else {
                const match = re.exec(testText);
                if (match) foundMatches.push(match);
            }

            // Build highlighted HTML safely
            const escape = (str: string) =>
                str.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

            let currentPos = 0;
            let html = "";

            foundMatches.forEach((match, idx) => {
                const index = match.index;
                const length = match[0].length;

                // Index might be less than currentPos if regex behaves strangely
                if (index < currentPos) return;

                // Add text before match
                html += escape(testText.substring(currentPos, index));

                // Add highlighted match
                const matchVal = escape(testText.substring(index, index + length));
                html += `<span class="regex-match" data-idx="${idx}">${matchVal}</span>`;

                currentPos = index + length;
            });

            // Add remaining text
            html += escape(testText.substring(currentPos));

            return { matches: foundMatches, highlightedHtml: html, error: null };
        } catch (err: any) {
            return { matches: [], highlightedHtml: escape(testText), error: err.message };
        }
    }, [pattern, activeFlags, testText]);

    // Helper to safely escape text for the error case
    function escape(str: string) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    const { matches, highlightedHtml, error } = results;

    const toggleFlag = (flag: keyof typeof flags) => {
        setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
    };

    return (
        <ToolPageLayout
            id="regex-tester"
            title="Regex Tester"
            description="Test regular expressions with live match highlighting and group results."
            icon="🔍"
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "1.25rem",
                    maxWidth: "960px",
                    margin: "0 auto",
                }}
            >
                <div className="card" style={{ padding: "1.5rem" }}>
                    {/* Pattern Input */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                marginBottom: "0.5rem",
                                color: "var(--text-secondary)",
                            }}
                        >
                            Regular Expression
                        </label>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <span style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}>/</span>
                            <input
                                className="input"
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                placeholder="([a-zA-Z0-9]+)@([a-z]+)\.com"
                                style={{
                                    flex: 1,
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "1rem",
                                }}
                            />
                            <span style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}>/</span>
                            <div style={{ display: "flex", gap: "4px" }}>
                                {Object.keys(flags).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => toggleFlag(f as any)}
                                        className={`btn btn-xs ${flags[f as keyof typeof flags] ? "btn-primary" : "btn-ghost"}`}
                                        title={`Toggle ${f} flag`}
                                        style={{ width: "24px", padding: 0 }}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {error && (
                            <div
                                style={{
                                    marginTop: "0.5rem",
                                    fontSize: "0.8125rem",
                                    color: "#ef4444",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                ❌ {error}
                            </div>
                        )}
                    </div>

                    {/* Test Text Area */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                marginBottom: "0.5rem",
                                color: "var(--text-secondary)",
                            }}
                        >
                            Test String
                        </label>
                        <textarea
                            className="input"
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                            placeholder="Type text here to test against your regex..."
                            rows={6}
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.875rem",
                                resize: "vertical",
                                minHeight: "120px",
                            }}
                        />
                    </div>

                    {/* Highlighted Results */}
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
                                Match Preview
                            </label>
                            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                                {matches.length} matches found
                            </span>
                        </div>
                        <div
                            className="code-block"
                            style={{
                                minHeight: "120px",
                                overflowY: "auto",
                                padding: "1rem",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-all",
                            }}
                            dangerouslySetInnerHTML={{ __html: highlightedHtml || '<span style="color:var(--text-muted)">Preview will appear here...</span>' }}
                        />
                    </div>

                    {/* Matches List */}
                    {matches.length > 0 && (
                        <div style={{ marginTop: "1.5rem" }}>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    marginBottom: "0.75rem",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                Captures & Groups
                            </label>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.75rem",
                                }}
                            >
                                {matches.slice(0, 5).map((m: RegExpExecArray, i: number) => (
                                    <div
                                        key={i}
                                        style={{
                                            padding: "0.75rem",
                                            background: "rgba(99, 102, 241, 0.05)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "var(--radius-md)",
                                        }}
                                    >
                                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.375rem" }}>
                                            Match {i + 1}
                                        </div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
                                            {m[0]}
                                        </div>
                                        {m.length > 1 && (
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginTop: "0.5rem" }}>
                                                {m.slice(1).map((group: string | undefined, gi: number) => (
                                                    <span
                                                        key={gi}
                                                        style={{
                                                            fontSize: "0.75rem",
                                                            padding: "0.125rem 0.5rem",
                                                            background: "rgba(99, 102, 241, 0.15)",
                                                            borderRadius: "99px",
                                                            fontFamily: "var(--font-mono)",
                                                        }}
                                                    >
                                                        ${gi + 1}: {group || '(null)'}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {matches.length > 5 && (
                                    <div style={{ textAlign: "center", fontStyle: "italic", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                                        ...and {matches.length - 5} more matches
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .regex-match {
                    background: rgba(99, 102, 241, 0.3);
                    box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.5);
                    border-radius: 2px;
                    padding: 0 1px;
                }
                .dark .regex-match {
                    background: rgba(129, 140, 248, 0.4);
                    box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.6);
                }
            `}</style>
        </ToolPageLayout>
    );
}
