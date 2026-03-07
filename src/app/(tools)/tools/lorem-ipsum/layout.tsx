import { Metadata } from "next";
import { TOOLS } from "@/data/tools";

const tool = TOOLS.find((t) => t.id === "lorem-ipsum");

export const metadata: Metadata = {
    title: tool?.name || "Lorem Ipsum Generator",
    description: tool?.description || "Generate placeholder text for your designs.",
    keywords: tool?.keywords || ["lorem", "ipsum", "placeholder", "text"],
};

export default function LoremIpsumLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
