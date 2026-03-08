import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        await connectToDatabase();

        // 1. Save to Database
        const contact = await Contact.create({
            name,
            email,
            message,
        });

        // 2. Send Email Notification
        try {
            await resend.emails.send({
                from: "DevTools Hub Contact <onboarding@resend.dev>",
                to: "souravrooj64@gmail.com",
                subject: "📩 New Message from " + name,
                html: `
          <h1>New Contact Message</h1>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #6366f1;">
            ${message.replace(/\n/g, '<br />')}
          </blockquote>
          <hr />
          <p>This message has been saved to your MongoDB collection.</p>
        `,
            });
        } catch (emailError) {
            console.error("[Email Error] Failed to send contact alert:", emailError);
        }

        return NextResponse.json({ success: true, data: contact }, { status: 201 });
    } catch (error: any) {
        console.error("[API Contact Error]:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
