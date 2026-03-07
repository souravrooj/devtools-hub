import { Metadata } from "next";
import { TOOLS } from "@/data/tools";

const tool = TOOLS.find((t) => t.id === "uuid-generator");

export const metadata: Metadata = {
    title: tool?.name || "UUID Generator",
    description: tool?.description || "Generate RFC-compliant UUIDs in bulk.",
    keywords: tool?.keywords || ["uuid", "guid", "unique", "id", "generator"],
};

export default function UuidGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
