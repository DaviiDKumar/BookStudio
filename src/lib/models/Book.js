// src/lib/models/Book.js
import mongoose from 'mongoose';

// Define the schema for a single book document
const bookSchema = new mongoose.Schema({
  // --- Core Book Information ---
  title: {
    type: String,
    required: true,
    trim: true // Trim whitespace from the title
  },
  authors: {
    type: [String], // Array of strings
    default: [],
  },
  publisher: {
    type: String,
    trim: true
  },
  publishedDate: Date, // Stored as a Date object for easier sorting

  description: String,
  pageCount: Number,

  thumbnailUrl: String, // URL for the small cover image
  images: {
    type: [String], // Array of image URLs (can store multiple resolutions/angles)
    default: [],
  },

  // --- Links and Identifiers ---
  googleBookId: String, // The ID from Google Books API
  previewLink: String,
  buyLink: String,

  // --- Price Information ---
  price: {
    amount: Number,
    currencyCode: String,
  },
  saleability: String, // e.g., "FOR_SALE", "FREE", "NOT_FOR_SALE"

  // --- Ratings and Reviews ---
  averageRating: Number, // e.g., 4.5
  ratingsCount: Number, // e.g., 1200

  // --- Format Information ---
  printType: String, // e.g., "BOOK", "MAGAZINE", "JOURNAL"
  isEbook: {
    type: Boolean,
    default: false,
  },
  // You could add a 'bookFormat: String' here if you want to manually specify
  // "Hardcover" or "Paperback" beyond what Google Books provides.

  // --- Categorization and Featured Flags ---
  categories: {
    type: [String], // Array of strings for categories (e.g., ["Fiction", "Fantasy"])
    default: [],
    index: true // Add an index for faster querying by category
  },
  language: String, // e.g., "en", "hi"

  isBestPick: {
    type: Boolean,
    default: false,
    index: true // Add an index for faster querying by this flag
  },
  isNewTrend: {
    type: Boolean,
    default: false,
    index: true // Add an index for faster querying by this flag
  },
  isBestSeller: {
    type: Boolean,
    default: false,
    index: true // Add an index for faster querying by this flag
  },

}, {
  timestamps: true // Mongoose will automatically add 'createdAt' and 'updatedAt' fields
});

// Create the Mongoose model.
// Use mongoose.models.Book to prevent re-compiling the model if it already exists,
// which is common in Next.js development mode with hot reloading.
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;