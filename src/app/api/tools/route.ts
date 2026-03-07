import { NextResponse } from "next/server";
import { TOOLS, CATEGORIES } from "@/data/tools";

/**
 * GET /api/tools
 *
 * Returns the full list of tools and categories from the registry.
 * Useful for external integrations or building a CLI tool.
 */
export async function GET() {
    return NextResponse.json({
        success: true,
        data: {
            tools: TOOLS,
            categories: CATEGORIES,
            counts: {
                total: TOOLS.length,
                available: TOOLS.filter((t) => t.available).length,
                comingSoon: TOOLS.filter((t) => !t.available).length,
            },
        },
    });
}
