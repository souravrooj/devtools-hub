import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Base64 Encoder / Decoder",
    description:
        "Encode plain text to Base64 or decode Base64 back to readable text — instantly, right in your browser. Free online Base64 tool.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "encode base64", "decode base64"],
    openGraph: {
        title: "Base64 Encoder / Decoder | DevTools Hub",
        description: "Encode or decode Base64 text instantly in your browser.",
    },
};

export default function Base64Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
