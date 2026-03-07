import { Metadata } from "next";
import { TOOLS } from "@/data/tools";

const tool = TOOLS.find((t) => t.id === "timestamp-converter");

export const metadata: Metadata = {
    title: tool?.name || "Timestamp Converter",
    description: tool?.description || "Convert Unix timestamps to readable dates and vice versa.",
    keywords: tool?.keywords || ["timestamp", "unix", "date", "time", "epoch"],
};

export default function TimestampConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
