"use client";

import ToolPageLayout from "@/components/layout/ToolPageLayout";

export default function ContactPage() {
    const owner = {
        name: "Sourav Rooj",
        email: "souravrooj64@gmail.com",
        phone: "+91 7001014799",
        github: "https://github.com/souravrooj",
        location: "India"
    };

    return (
        <ToolPageLayout
            id="contact"
            title="Contact Us"
            description="Have questions, feedback, or business inquiries? Get in touch with the creator."
            icon="✉️"
        >
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "2rem" }}>
                    {/* Info Card */}
                    <div className="card" style={{ padding: "2rem", height: "fit-content" }}>
                        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                            <div style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                background: "var(--accent-muted)",
                                margin: "0 auto 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "3rem",
                                border: "4px solid var(--bg-primary)",
                                boxShadow: "var(--shadow-md)"
                            }}>
                                👨‍💻
                            </div>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.25rem" }}>{owner.name}</h2>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>Project Lead & Developer</p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ color: "var(--accent)" }}>📧</div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Email</div>
                                    <a href={`mailto:${owner.email}`} style={{ fontSize: "0.9375rem", color: "var(--text-primary)", textDecoration: "none", fontWeight: 600 }}>{owner.email}</a>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ color: "var(--accent)" }}>📞</div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Phone</div>
                                    <span style={{ fontSize: "0.9375rem", color: "var(--text-primary)", fontWeight: 600 }}>{owner.phone}</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ color: "var(--accent)" }}>📍</div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Location</div>
                                    <span style={{ fontSize: "0.9375rem", color: "var(--text-primary)", fontWeight: 600 }}>{owner.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Message Form */}
                    <div className="card" style={{ padding: "2.5rem" }}>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem" }}>Send a Quick Message</h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent to Sourav!'); }}>
                            <div style={{ marginBottom: "1.25rem" }}>
                                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Your Name</label>
                                <input type="text" className="input" placeholder="John Doe" required style={{ width: "100%" }} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }}>
                                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Your Email</label>
                                <input type="email" className="input" placeholder="john@example.com" required style={{ width: "100%" }} />
                            </div>
                            <div style={{ marginBottom: "1.5rem" }}>
                                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Message</label>
                                <textarea className="input" placeholder="How can we help you?" rows={5} required style={{ width: "100%", resize: "none" }} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: "100%", height: "48px" }}>🚀 Send Message</button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .grid-2 {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </ToolPageLayout>
    );
}
