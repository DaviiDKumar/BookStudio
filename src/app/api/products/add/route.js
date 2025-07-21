// src/app/api/books/add/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose'; // Your MongoDB connection utility
import Book from '@/lib/models/Book';   // Your Mongoose Book model

export async function POST(request) {
  try {
    await dbConnect(); // Connect to MongoDB Atlas

    // Parse the request body to get the book data
    const body = await request.json();

    // Determine if the body is a single object or an array of objects
    let result;
    if (Array.isArray(body)) {
      // If it's an array, insert multiple documents
      result = await Book.insertMany(body);
      console.log(`Successfully inserted ${result.length} books.`);
    } else if (typeof body === 'object' && body !== null) {
      // If it's a single object, create one document
      result = await Book.create(body);
      console.log(`Successfully inserted one book: ${result.title}`);
    } else {
      // Invalid request body
      return NextResponse.json(
        { message: 'Invalid request body. Expected a single book object or an array of book objects.' },
        { status: 400 }
      );
    }

    // Return a success response with the inserted document(s)
    return NextResponse.json(result, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('API Error: Failed to add book(s):', error);
    // Return an error response
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}