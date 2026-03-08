import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongodb";
import Suggestion from "@/models/Suggestion";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, description, email } = await req.json();

        if (!name || !description || !email) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        await connectToDatabase();

        // 1. Save to Database
        const suggestion = await Suggestion.create({
            name,
            description,
            email,
            status: "pending",
        });

        // 2. Send Email Notification
        try {
            await resend.emails.send({
                from: "DevTools Hub <onboarding@resend.dev>",
                to: "souravrooj64@gmail.com",
                subject: "🚀 New Tool Suggestion: " + name,
                html: `
          <h1>New Tool Suggestion</h1>
          <p><strong>Tool Name:</strong> ${name}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Proposed by:</strong> ${email}</p>
          <hr />
          <p>This suggestion has been saved to your MongoDB collection.</p>
        `,
            });
        } catch (emailError) {
            console.error("[Email Error] Failed to send suggestion alert:", emailError);
            // We don't fail the request if just the email fails
        }

        return NextResponse.json({ success: true, data: suggestion }, { status: 201 });
    } catch (error: any) {
        console.error("[API Suggestion Error]:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
