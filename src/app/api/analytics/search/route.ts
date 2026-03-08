import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

// We'll use a dynamic schema for analytics
const SearchSchema = new mongoose.Schema({
    query: String,
    timestamp: { type: Date, default: Date.now }
});

const SearchAnalytics = mongoose.models.SearchAnalytics || mongoose.model("SearchAnalytics", SearchSchema);

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        if (!query || query.length < 3) {
            return NextResponse.json({ success: true }); // Silent skip for short queries
        }

        await connectToDatabase();
        await SearchAnalytics.create({ query: query.toLowerCase().trim() });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[Search Analytics] Error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
