"use client";

import { useState } from "react";
import { marked } from "marked";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";
import ResizableLayout from "@/components/ui/ResizableLayout";

const DEFAULT_MARKDOWN = `# Hello Markdown! 👋

This is a **live preview** of your Markdown text.

## Features

- **Bold** and *italic* text
- Lists (ordered and unordered)
- [Links](https://example.com)
- Code blocks

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Blockquotes are supported too!

| Feature | Status |
|---------|--------|
| Headings | ✅ |
| Lists | ✅ |
| Code | ✅ |
| Tables | ✅ |

---

*Start editing on the left to see changes here instantly.*
`;

export default function MarkdownPreviewPage() {
    const [input, setInput] = useState(DEFAULT_MARKDOWN);

    const html = (() => {
        try {
            return marked.parse(input, { async: false }) as string;
        } catch {
            return "<p>Error rendering markdown</p>";
        }
    })();

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
                <span
                    style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Markdown
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <CopyButton text={input} label="Copy MD" size="sm" />
                    <button
                        onClick={() => setInput("")}
                        className="btn btn-ghost btn-sm"
                    >
                        Clear
                    </button>
                </div>
            </div>
            <textarea
                id="markdown-input"
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your Markdown here..."
                style={{
                    flex: 1,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    resize: "none",
                    minHeight: "440px",
                    lineHeight: 1.7,
                }}
            />
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
                    Preview
                </span>
            </div>
            <div
                className="markdown-body"
                style={{
                    flex: 1,
                    overflow: "auto",
                    padding: "0.5rem",
                    minHeight: "440px",
                }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );

    return (
        <ToolPageLayout
            id="markdown-preview"
            title="Markdown Preview"
            description="Write Markdown and see a live rendered preview alongside your text."
            icon="📝"
        >
            <ResizableLayout left={leftPanel} right={rightPanel} />
        </ToolPageLayout>
    );
}
