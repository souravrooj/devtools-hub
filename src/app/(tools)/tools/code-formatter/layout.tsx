import { Metadata } from "next";
import { TOOLS } from "@/data/tools";

const tool = TOOLS.find((t) => t.id === "code-formatter");

export const metadata: Metadata = {
    title: tool?.name || "Code Formatter",
    description: tool?.description || "Prettify and format JavaScript, TypeScript, CSS, and HTML code blocks.",
    keywords: tool?.keywords || ["format", "prettier", "code", "javascript", "typescript", "css"],
};

export default function CodeFormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
