// src/lib/mongoose.js
import mongoose from 'mongoose';

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Check if MONGODB_URI is defined
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If a connection already exists, use it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      // These options are often implicitly handled by recent Mongoose versions
      // but explicitly setting them doesn't hurt.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      bufferCommands: false, // Recommended for serverless environments
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB Connected!'); // Log success
      return mongoose;
    }).catch(err => {
        console.error('MongoDB Connection Error:', err); // Log error
        cached.promise = null; // Reset promise on error to allow retries
        throw err; // Re-throw the error to be caught by the calling function
    });
  }

  // Await the connection promise and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;