import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import UserModel from "@/models/User";
import ToolModel from "@/models/Tool";

/**
 * GET /api/user/favorites
 * 
 * Fetches the favorites list for a specific device.
 */
export async function GET(request: NextRequest) {
    const deviceId = request.headers.get("x-device-id");

    if (!deviceId) {
        return NextResponse.json({ success: false, error: "Missing x-device-id" }, { status: 400 });
    }

    try {
        await connectToDatabase();
        let user = await UserModel.findOne({ deviceId });

        if (!user) {
            // Create user profile on first fetch if it doesn't exist
            user = await UserModel.create({ deviceId, favorites: [] });
        }

        return NextResponse.json({
            success: true,
            data: {
                favorites: user.favorites
            }
        });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

/**
 * POST /api/user/favorites
 * 
 * Toggles a tool in the user's favorites list.
 */
export async function POST(request: NextRequest) {
    const deviceId = request.headers.get("x-device-id");
    const { toolId } = await request.json();

    if (!deviceId || !toolId) {
        return NextResponse.json({ success: false, error: "Missing deviceId or toolId" }, { status: 400 });
    }

    try {
        await connectToDatabase();

        // Find user
        let user = await UserModel.findOne({ deviceId });
        if (!user) {
            user = new UserModel({ deviceId, favorites: [] });
        }

        const isCurrentlyFavorite = user.favorites.includes(toolId);

        if (isCurrentlyFavorite) {
            // Remove from user's favorites
            user.favorites = user.favorites.filter((id) => id !== toolId);
            // Decrement global tool favorites count
            await ToolModel.findOneAndUpdate({ toolId }, { $inc: { favoritesCount: -1 } });
        } else {
            // Add to user's favorites
            user.favorites.push(toolId);
            // Increment global tool favorites count
            await ToolModel.findOneAndUpdate({ toolId }, { $inc: { favoritesCount: 1 } }, { upsert: true });
        }

        await user.save();

        return NextResponse.json({
            success: true,
            data: {
                favorites: user.favorites,
                isFavorite: !isCurrentlyFavorite
            }
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
