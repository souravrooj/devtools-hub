import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON Formatter",
    description:
        "Paste raw JSON and get a beautifully formatted, validated, and readable version instantly. Free online JSON formatter with syntax validation.",
    keywords: ["json formatter", "json validator", "json beautifier", "format json online", "pretty print json"],
    openGraph: {
        title: "JSON Formatter | DevTools Hub",
        description: "Paste raw JSON and get a beautifully formatted version instantly.",
    },
};

export default function JsonFormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
