import { Metadata } from "next";
import { TOOLS } from "@/data/tools";

const tool = TOOLS.find((t) => t.id === "html-preview");

export const metadata: Metadata = {
    title: tool?.name || "HTML Preview",
    description: tool?.description || "Write HTML, CSS, and JS and see a live rendered preview in a sandbox.",
    keywords: tool?.keywords || ["html", "css", "js", "preview", "render", "sandbox"],
};

export default function HtmlPreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
