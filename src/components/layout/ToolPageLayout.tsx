import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

interface ToolPageLayoutProps {
    title: string;
    description: string;
    icon: string;
    children: React.ReactNode;
}

export default function ToolPageLayout({
    title,
    description,
    icon,
    children,
}: ToolPageLayoutProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header />

            <main style={{ flex: 1, padding: "2rem 0 3rem" }}>
                <div className="container">
                    {/* Tool header */}
                    <div
                        className="animate-fade-in"
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1rem",
                            marginBottom: "2rem",
                        }}
                    >
                        <div
                            style={{
                                width: "52px",
                                height: "52px",
                                borderRadius: "var(--radius-md)",
                                background: "var(--accent-muted)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "28px",
                                flexShrink: 0,
                            }}
                        >
                            {icon}
                        </div>
                        <div>
                            <h1
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    color: "var(--text-primary)",
                                    margin: "0 0 0.25rem",
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                {title}
                            </h1>
                            <p
                                style={{
                                    fontSize: "0.9375rem",
                                    color: "var(--text-secondary)",
                                    margin: 0,
                                    lineHeight: 1.5,
                                }}
                            >
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Tool content */}
                    <div className="animate-fade-in" style={{ animationDelay: "0.05s" }}>
                        <ErrorBoundary fallbackTitle={`Error loading ${title}`}>
                            {children}
                        </ErrorBoundary>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
