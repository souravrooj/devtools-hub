import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Generator",
    description:
        "Generate cryptographically secure passwords with customizable length, uppercase, lowercase, numbers, and symbols. Free online password generator.",
    keywords: ["password generator", "secure password", "random password", "strong password generator", "crypto password"],
    openGraph: {
        title: "Password Generator | DevTools Hub",
        description: "Generate cryptographically secure passwords with customizable options.",
    },
};

export default function PasswordGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
