import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Tool from "@/models/Tool";

/**
 * POST /api/tools/[id]/use
 *
 * Increments the view count for a specific tool.
 * Called when a user opens or uses a tool page.
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await connectToDatabase();

        // Find the tool by its ID (e.g., 'json-formatter') and increment its view count
        // We use upsert so that tools are added to the DB automatically on first use
        const tool = await Tool.findOneAndUpdate(
            { toolId: id },
            { $inc: { viewCount: 1 } },
            { new: true, upsert: true }
        );

        return NextResponse.json({
            success: true,
            data: {
                id: tool?.toolId,
                viewCount: tool?.viewCount,
            },
        });
    } catch (error) {
        console.error(`[API] Error tracking usage for ${id}:`, error);
        return NextResponse.json(
            { success: false, error: "Failed to track usage" },
            { status: 500 }
        );
    }
}
