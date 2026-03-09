import { NextResponse } from "next/server";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { connectToDatabase } from "@/lib/mongodb";
import ToolModel from "@/models/Tool";

/**
 * GET /api/tools
 *
 * Returns the full list of tools and categories from the registry.
 * If MongoDB is connected, also ensures tools exist in DB and includes stats.
 */
export async function GET() {
    let toolStats: Record<string, { views: number; favorites: number }> = {};

    try {
        await connectToDatabase();

        // Perform lazy synchronization — ensure every tool from tools.ts is in DB
        // Using a bulk operation for efficiency
        const bulkOps = TOOLS.map(tool => ({
            updateOne: {
                filter: { toolId: tool.id },
                update: {
                    $set: {
                        name: tool.name,
                        description: tool.description,
                        category: tool.category,
                        icon: tool.icon,
                        available: tool.available,
                        keywords: tool.keywords || []
                    }
                },
                upsert: true
            }
        }));

        if (bulkOps.length > 0) {
            await ToolModel.bulkWrite(bulkOps);
        }

        // Fetch all tool stats from DB
        const dbTools = await ToolModel.find({});
        dbTools.forEach((dbTool) => {
            toolStats[dbTool.toolId] = {
                views: dbTool.viewCount || 0,
                favorites: dbTool.favoritesCount || 0
            };
        });
    } catch (err) {
        console.error("[API Tools] Error syncing or fetching from DB:", err);
    }

    const enhancedTools = TOOLS.map((tool) => ({
        ...tool,
        viewCount: toolStats[tool.id]?.views || 0,
        favoritesCount: toolStats[tool.id]?.favorites || 0
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
