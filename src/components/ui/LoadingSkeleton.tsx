export default function ToolLoadingSkeleton() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                background: "var(--bg-primary)",
            }}
        >
            {/* Fake header */}
            <div
                style={{
                    height: "64px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 1.5rem",
                }}
            >
                <div className="skeleton" style={{ width: "140px", height: "28px" }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: "2rem 1.5rem", maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
                {/* Title area */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "2rem" }}>
                    <div className="skeleton" style={{ width: "52px", height: "52px", borderRadius: "var(--radius-md)" }} />
                    <div style={{ flex: 1 }}>
                        <div className="skeleton" style={{ width: "220px", height: "24px", marginBottom: "0.5rem" }} />
                        <div className="skeleton" style={{ width: "360px", height: "16px" }} />
                    </div>
                </div>

                {/* Two-column skeleton */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div className="skeleton" style={{ height: "420px", borderRadius: "var(--radius-lg)" }} />
                    <div className="skeleton" style={{ height: "420px", borderRadius: "var(--radius-lg)" }} />
                </div>
            </div>
        </div>
    );
}

export function HomeLoadingSkeleton() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                background: "var(--bg-primary)",
            }}
        >
            {/* Fake header */}
            <div
                style={{
                    height: "64px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 1.5rem",
                }}
            >
                <div className="skeleton" style={{ width: "140px", height: "28px" }} />
            </div>

            {/* Hero area */}
            <div
                style={{
                    padding: "4rem 1.5rem 2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <div className="skeleton" style={{ width: "200px", height: "24px", borderRadius: "99px" }} />
                <div className="skeleton" style={{ width: "480px", height: "48px" }} />
                <div className="skeleton" style={{ width: "400px", height: "20px" }} />
                <div className="skeleton" style={{ width: "560px", height: "48px", borderRadius: "var(--radius-lg)", marginTop: "0.5rem" }} />
            </div>

            {/* Category tabs */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0 1.5rem 1.5rem",
                }}
            >
                {[100, 90, 80, 70, 90, 70].map((w, i) => (
                    <div key={i} className="skeleton" style={{ width: `${w}px`, height: "32px", borderRadius: "var(--radius-md)" }} />
                ))}
            </div>

            {/* Card grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1.25rem",
                    padding: "0 1.5rem 3rem",
                    maxWidth: "1280px",
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="skeleton" style={{ height: "200px", borderRadius: "var(--radius-lg)" }} />
                ))}
            </div>
        </div>
    );
}
