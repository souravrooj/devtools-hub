"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";

interface Props {
    children: ReactNode;
    fallbackTitle?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("[DevTools Hub] Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "3rem 2rem",
                        textAlign: "center",
                        minHeight: "300px",
                    }}
                >
                    <div
                        style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "var(--radius-lg)",
                            background: "rgb(239 68 68 / 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "28px",
                            marginBottom: "1rem",
                        }}
                    >
                        ⚠️
                    </div>

                    <h2
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            margin: "0 0 0.5rem",
                        }}
                    >
                        {this.props.fallbackTitle || "Something went wrong"}
                    </h2>

                    <p
                        style={{
                            fontSize: "0.9375rem",
                            color: "var(--text-secondary)",
                            maxWidth: "400px",
                            margin: "0 0 0.25rem",
                            lineHeight: 1.6,
                        }}
                    >
                        An unexpected error occurred. Please try again.
                    </p>

                    {this.state.error && (
                        <pre
                            style={{
                                fontSize: "0.75rem",
                                color: "var(--text-muted)",
                                background: "var(--bg-muted)",
                                borderRadius: "var(--radius-sm)",
                                padding: "0.5rem 1rem",
                                margin: "1rem 0",
                                maxWidth: "500px",
                                overflow: "auto",
                                fontFamily: "var(--font-mono)",
                            }}
                        >
                            {this.state.error.message}
                        </pre>
                    )}

                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            className="btn btn-primary btn-sm"
                        >
                            Try Again
                        </button>
                        <Link href="/" className="btn btn-ghost btn-sm">
                            Go Home
                        </Link>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
