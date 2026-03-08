"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ToolStats {
    id: string;
    name: string;
    category: string;
    icon: string;
    viewCount: number;
}

export default function StatsPage() {
    const [stats, setStats] = useState<ToolStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/tools");
                const json = await res.json();
                if (json.success) {
                    const sorted = [...json.data.tools].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
                    setStats(sorted);
                }
            } catch (err) {
                console.error("Failed to fetch stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const totalViews = stats.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);

    return (
        <main className="container section-padding">
            <div style={{ marginBottom: "3rem", textAlign: "center", paddingTop: "2rem" }}>
                <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                    Tool Usage Analytics
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
                    Real-time insights into which tools are most popular in the DevTools Hub community.
                </p>
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
                    <div className="skeleton" style={{ width: "100%", maxWidth: "800px", height: "400px" }}></div>
                </div>
            ) : (
                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    {/* Overview Cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                        <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Total Tools</div>
                            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)" }}>{stats.length}</div>
                        </div>
                        <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Total Usage Hits</div>
                            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)" }}>{totalViews.toLocaleString()}</div>
                        </div>
                    </div>

                    {/* Stats Table */}
                    <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                <thead style={{ background: "var(--bg-muted)", borderBottom: "1px solid var(--border)" }}>
                                    <tr>
                                        <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Rank</th>
                                        <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Tool</th>
                                        <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Category</th>
                                        <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", textAlign: "right" }}>Usage Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.map((tool, index) => (
                                        <tr key={tool.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.2s" }} className="table-row-hover">
                                            <td style={{ padding: "1rem 1.5rem" }}>
                                                <span style={{
                                                    fontWeight: 700,
                                                    color: index < 3 ? "var(--accent)" : "inherit",
                                                    fontSize: index < 3 ? "1.125rem" : "1rem"
                                                }}>
                                                    #{index + 1}
                                                </span>
                                            </td>
                                            <td style={{ padding: "1rem 1.5rem" }}>
                                                <Link href={`/tools/${tool.id}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "inherit" }}>
                                                    <span style={{ fontSize: "1.25rem" }}>{tool.icon}</span>
                                                    <span style={{ fontWeight: 600 }}>{tool.name}</span>
                                                </Link>
                                            </td>
                                            <td style={{ padding: "1rem 1.5rem" }}>
                                                <span className="badge" style={{ fontSize: "0.75rem", textTransform: "capitalize" }}>{tool.category}</span>
                                            </td>
                                            <td style={{ padding: "1rem 1.5rem", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                                                {tool.viewCount.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .table-row-hover:hover {
                    background: rgba(99, 102, 241, 0.03) !important;
                }
            `}</style>
        </main>
    );
}
