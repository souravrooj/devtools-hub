/**
 * models/User.ts
 *
 * Mongoose schema for user interactions (favorites, settings) tied to a guest device.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserDocument extends Document {
    deviceId: string;      // Anonymous identifier stored in cookie or local storage
    favorites: string[];   // Array of tool IDs
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
    {
        deviceId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        favorites: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.index({ deviceId: 1 });

const UserModel: Model<IUserDocument> =
    (mongoose.models.User as Model<IUserDocument>) ||
    mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
