import mongoose, { Schema, Document } from "mongoose";

export interface ISuggestion extends Document {
    name: string;
    description: string;
    email: string;
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
}

const SuggestionSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Suggestion || mongoose.model<ISuggestion>("Suggestion", SuggestionSchema);
