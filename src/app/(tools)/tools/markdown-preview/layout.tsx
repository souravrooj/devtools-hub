import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Markdown Preview",
    description:
        "Write Markdown and instantly see a live rendered preview alongside your text. Supports headings, lists, code blocks, tables, and more.",
    keywords: ["markdown preview", "markdown editor", "markdown renderer", "live markdown", "readme preview"],
    openGraph: {
        title: "Markdown Preview | DevTools Hub",
        description: "Write Markdown and see a live rendered preview instantly.",
    },
};

export default function MarkdownPreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
