/**
 * lib/mongodb.ts
 *
 * MongoDB connection helper using Mongoose.
 * Uses a global cached connection to avoid creating multiple
 * connections during Next.js hot-reloads in development.
 */

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  // In development, warn instead of crashing — DB is optional for v1
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[DevTools Hub] MONGODB_URI is not set. Database features will be disabled."
    );
  } else {
    throw new Error(
      "Please define the MONGODB_URI environment variable in .env.local"
    );
  }
}

/** Cached connection stored on the global object to survive HMR in dev */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend NodeJS global type to include the mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

/**
 * Connect to MongoDB.
 * Returns the cached connection on subsequent calls.
 */
export async function connectToDatabase(): Promise<Mongoose | null> {
  if (!MONGODB_URI) return null;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME ?? "devtools_hub",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
