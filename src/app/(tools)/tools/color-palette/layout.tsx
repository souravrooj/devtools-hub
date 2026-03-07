import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Color Palette Generator",
    description:
        "Generate beautiful random color palettes with hex codes ready to copy for your CSS projects. Lock colors and regenerate the rest.",
    keywords: ["color palette generator", "random colors", "hex color generator", "color scheme", "css colors"],
    openGraph: {
        title: "Color Palette Generator | DevTools Hub",
        description: "Generate beautiful random color palettes with hex codes ready to copy.",
    },
};

export default function ColorPaletteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
