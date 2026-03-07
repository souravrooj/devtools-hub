import { Metadata } from "next";
import { TOOLS } from "@/data/tools";

const tool = TOOLS.find((t) => t.id === "regex-tester");

export const metadata: Metadata = {
    title: tool?.name || "Regex Tester",
    description: tool?.description || "Test regular expressions with live match highlighting.",
    keywords: tool?.keywords || ["regex", "regexp", "pattern", "test", "match"],
};

export default function RegexTesterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
