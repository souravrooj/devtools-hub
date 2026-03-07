import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevTools Hub — Developer Utilities in One Place",
    template: "%s | DevTools Hub",
  },
  description:
    "A fast, free collection of developer tools — JSON formatter, password generator, markdown preview, Base64 encoder, color palette, and more. No login required.",
  keywords: [
    "developer tools",
    "json formatter",
    "password generator",
    "markdown preview",
    "base64 encoder",
    "color palette",
    "dev utilities",
    "web tools",
  ],
  authors: [{ name: "DevTools Hub" }],
  creator: "DevTools Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "DevTools Hub",
    title: "DevTools Hub — Developer Utilities in One Place",
    description:
      "A fast, free collection of developer tools. No login required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub",
    description: "A fast, free collection of developer tools.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // Default to dark on first load — useTheme hook will adjust based on localStorage
      className="dark"
    >
      <head>
        {/* Prevent FOUC — apply stored theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('devtools-hub-theme');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (t === 'dark' || !t) {
                  document.documentElement.classList.add('dark');
                } else {
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (!prefersDark) document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
