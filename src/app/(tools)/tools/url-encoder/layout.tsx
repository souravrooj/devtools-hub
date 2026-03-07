import { Metadata } from "next";
import { TOOLS } from "@/data/tools";

const tool = TOOLS.find((t) => t.id === "url-encoder");

export const metadata: Metadata = {
    title: tool?.name || "URL Encoder / Decoder",
    description: tool?.description || "Encode or decode special characters in URLs.",
    keywords: tool?.keywords || ["url", "encode", "decode", "percent", "uri"],
};

export default function UrlEncoderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
