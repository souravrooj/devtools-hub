import { NextResponse } from "next/server";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { connectToDatabase } from "@/lib/mongodb";
import ToolModel from "@/models/Tool";

/**
 * GET /api/tools
 *
 * Returns the full list of tools and categories from the registry.
 * If MongoDB is connected, also includes view stats for each tool.
 */
export async function GET() {
    let toolStats: Record<string, number> = {};

    try {
        await connectToDatabase();
        const dbTools = await ToolModel.find({});
        dbTools.forEach((dbTool) => {
            toolStats[dbTool.toolId] = dbTool.viewCount;
        });
    } catch (err) {
        console.error("[API Tools] Could not fetch stats from DB:", err);
    }

    const enhancedTools = TOOLS.map((tool) => ({
        ...tool,
        viewCount: toolStats[tool.id] || 0,
    }));

    return NextResponse.json({
        success: true,
        data: {
            tools: enhancedTools,
            categories: CATEGORIES,
            counts: {
                total: TOOLS.length,
                available: TOOLS.filter((t) => t.available).length,
                comingSoon: TOOLS.filter((t) => !t.available).length,
            },
        },
    });
}
