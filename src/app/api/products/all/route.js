// src/app/api/books/all/route.js
import { NextResponse } from 'next/server'; // For sending JSON responses in App Router
import dbConnect from '@/lib/mongoose';     // Your MongoDB connection utility
import Book from '@/lib/models/Book';       // Your Mongoose Book model

export async function GET() {
  try {
    await dbConnect(); // Connect to MongoDB Atlas

    // Fetch all books from the 'books' collection
    // .lean() makes the query return plain JavaScript objects instead of Mongoose documents.
    // This can improve performance slightly for read operations where you don't need Mongoose features.
    const books = await Book.find({}).lean();

    // Return the fetched books as a JSON response with a 200 status
    return NextResponse.json(books, { status: 200 });

  } catch (error) {
    console.error('API Error: Failed to fetch all books:', error);
    // Return an error response if something goes wrong
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}