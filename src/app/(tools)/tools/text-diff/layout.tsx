import { Metadata } from "next";
import { TOOLS } from "@/data/tools";

const tool = TOOLS.find((t) => t.id === "text-diff");

export const metadata: Metadata = {
    title: tool?.name || "Text Diff Checker",
    description: tool?.description || "Compare two blocks of text and highlight the differences.",
    keywords: tool?.keywords || ["diff", "compare", "text", "difference", "changes"],
};

export default function TextDiffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
