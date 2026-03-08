import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
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
  authors: [{ name: "Sourav Rooj" }],
  creator: "Sourav Rooj",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://devtools-hub-pi-five.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "DevTools Hub",
    title: "DevTools Hub — Developer Utilities in One Place",
    description: "A fast, free collection of developer tools. No login required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevTools Hub — All your developer utilities in one place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub",
    description: "A fast, free collection of developer tools.",
    creator: "@souravrooj",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo.png",
  },
  manifest: "/manifest.webmanifest",
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
        <ToastProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Suspense fallback={<div style={{ height: "64px", background: "rgba(0,0,0,0.05)" }} />}>
              <Header />
            </Suspense>
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
