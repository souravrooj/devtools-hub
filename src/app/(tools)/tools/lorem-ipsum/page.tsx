"use client";

import { useState, useEffect } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import CopyButton from "@/components/ui/CopyButton";

const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

function generateParagraph(sentencesCount: number, startWithLorem: boolean, pIdx: number): string {
    let result = [];
    for (let s = 0; s < sentencesCount; s++) {
        let wordsCount = Math.floor(Math.random() * 8) + 8; // 8-16 words per sentence
        let sentence = [];

        for (let w = 0; w < wordsCount; w++) {
            let word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
            if (pIdx === 0 && s === 0 && w < 2 && startWithLorem) {
                word = w === 0 ? "Lorem" : "ipsum";
            }
            sentence.push(word);
        }

        let sentenceStr = sentence.join(" ");
        sentenceStr = sentenceStr.charAt(0).toUpperCase() + sentenceStr.slice(1) + ".";
        result.push(sentenceStr);
    }
    return result.join(" ");
}

export default function LoremIpsumPage() {
    const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
    const [count, setCount] = useState(3);
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [output, setOutput] = useState("");

    const generate = () => {
        let result = "";
        if (type === "paragraphs") {
            const paragraphs = [];
            for (let i = 0; i < count; i++) {
                paragraphs.push(generateParagraph(5, startWithLorem, i));
            }
            result = paragraphs.join("\n\n");
        } else if (type === "sentences") {
            const sentences = [];
            for (let i = 0; i < count; i++) {
                sentences.push(generateParagraph(1, startWithLorem, i));
            }
            result = sentences.join(" ");
        } else {
            // Words
            const words = [];
            for (let i = 0; i < count; i++) {
                let word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
                if (i < 2 && startWithLorem) {
                    word = i === 0 ? "Lorem" : "ipsum";
                }
                words.push(word);
            }
            result = words.join(" ");
            result = result.charAt(0).toUpperCase() + result.slice(1);
        }
        setOutput(result);
    };

    useEffect(() => {
        generate();
    }, []);

    return (
        <ToolPageLayout
            id="lorem-ipsum"
            title="Lorem Ipsum Generator"
            description="Generate placeholder text for your UI/UX designs instantly."
            icon="📄"
        >
            <div className="card" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                {/* Controls */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }} className="lorem-controls">
                    <div>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-secondary)" }}>
                            Generate Type
                        </label>
                        <select
                            className="input"
                            style={{ width: "100%" }}
                            value={type}
                            onChange={(e) => setType(e.target.value as any)}
                        >
                            <option value="paragraphs">Paragraphs</option>
                            <option value="sentences">Sentences</option>
                            <option value="words">Words</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-secondary)" }}>
                            Count
                        </label>
                        <input
                            type="number"
                            className="input"
                            style={{ width: "100%" }}
                            value={count}
                            min={1}
                            max={50}
                            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={startWithLorem}
                            onChange={(e) => setStartWithLorem(e.target.checked)}
                            style={{ accentColor: "var(--accent)" }}
                        />
                        Start with "Lorem ipsum..."
                    </label>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <button onClick={generate} className="btn btn-primary" style={{ flex: 1 }}>
                        ✨ Generate text
                    </button>
                    {output && <CopyButton text={output} />}
                </div>

                {/* Output Area */}
                <div>
                    <textarea
                        className="input"
                        value={output}
                        readOnly
                        rows={10}
                        style={{
                            width: "100%",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9375rem",
                            lineHeight: 1.6,
                            resize: "vertical",
                            minHeight: "200px"
                        }}
                    />
                </div>
            </div>

            <style>{`
                @media (max-width: 600px) {
                    .lorem-controls {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
            `}</style>
        </ToolPageLayout>
    );
}
