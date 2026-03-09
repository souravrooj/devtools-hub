/**
 * models/Tool.ts
 *
 * Mongoose schema for storing tool metadata in MongoDB.
 * Used for future features: saved favorites, usage history, analytics.
 *
 * This model is optional in v1 — the app works fully without a DB connection.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------

export interface IToolDocument extends Document {
    toolId: string;        // References Tool.id from data/tools.ts
    name: string;
    description: string;
    category: string;
    icon: string;
    available: boolean;
    keywords: string[];
    viewCount: number;     // How many times this tool was accessed
    favoritesCount: number; // Global favorite count
    createdAt: Date;
    updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const ToolSchema = new Schema<IToolDocument>(
    {
        toolId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        icon: { type: String, required: true },
        available: { type: Boolean, default: true },
        keywords: { type: [String], default: [] },
        viewCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        favoritesCount: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------

ToolSchema.index({ toolId: 1 });
ToolSchema.index({ viewCount: -1 });
ToolSchema.index({ category: 1 });

// ---------------------------------------------------------------------------
// Model Export (singleton-safe for Next.js hot-reload in development)
// ---------------------------------------------------------------------------

const ToolModel: Model<IToolDocument> =
    (mongoose.models.Tool as Model<IToolDocument>) ||
    mongoose.model<IToolDocument>("Tool", ToolSchema);

export default ToolModel;
