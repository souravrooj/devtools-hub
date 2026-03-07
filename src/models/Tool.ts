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
    viewCount: number;     // How many times this tool was accessed
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
        viewCount: {
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

// ---------------------------------------------------------------------------
// Model Export (singleton-safe for Next.js hot-reload in development)
// ---------------------------------------------------------------------------

const ToolModel: Model<IToolDocument> =
    (mongoose.models.Tool as Model<IToolDocument>) ||
    mongoose.model<IToolDocument>("Tool", ToolSchema);

export default ToolModel;
