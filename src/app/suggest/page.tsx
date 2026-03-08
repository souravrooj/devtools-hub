"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import { useToast } from "@/components/ui/Toast";

export default function SuggestToolPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [formData, setFormData] = useState({ name: "", description: "", email: "" });
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/suggestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const json = await res.json();

            if (json.success) {
                setStatus("success");
                showToast("Suggestion sent successfully!");
            } else {
                throw new Error(json.error || "Failed to send suggestion");
            }
        } catch (err: any) {
            console.error("Suggestion error:", err);
            showToast(err.message || "Failed to send suggestion", "error");
            setStatus("idle");
        }
    };

    if (status === "success") {
        return (
            <div className="container" style={{ textAlign: "center", padding: "10rem 0" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚀</div>
                <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                    Thanks for the suggestion!
                </h1>
                <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                    We've received your tool idea and will review it for the next update.
                </p>
                <button onClick={() => window.location.href = "/"} className="btn btn-primary">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <ToolPageLayout
            id="suggest"
            title="Suggest a Tool"
            description="Is there a developer tool you're missing? Let us know and we'll build it!"
            icon="💡"
        >
            <div className="card" style={{ maxWidth: "600px", margin: "0 auto", padding: "2.5rem" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                            Tool Name
                        </label>
                        <input
                            type="text"
                            className="input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., JWT Debugger"
                            required
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                            Tool Description
                        </label>
                        <textarea
                            className="input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="What should this tool do?"
                            rows={4}
                            required
                            style={{ width: "100%", resize: "none" }}
                        />
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                            Your Email
                        </label>
                        <input
                            type="email"
                            className="input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="To notify you when it's live"
                            required
                            style={{ width: "100%" }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="btn btn-primary"
                        style={{ width: "100%", height: "48px" }}
                    >
                        {status === "submitting" ? "Submitting..." : "Send Suggestion"}
                    </button>
                </form>
            </div>
        </ToolPageLayout>
    );
}
