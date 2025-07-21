// components/ShopProductCard.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <--- Import the Image component
import '../stylesShopComponent/ShopProductsCard.css';

export default function ShopProductCard({ book }) {
    // Define default width and height for the book cover thumbnail.
    // Adjust these values to match the actual size and aspect ratio
    // you expect for your book cover images.
    const imageWidth = 200;  // Example width in pixels
    const imageHeight = 300; // Example height in pixels (common book cover aspect ratio)

    return (
        <div className="product-card">
            {/* Replaced <img> with <Image /> */}
            {book.coverImage ? ( // Conditionally render if coverImage exists
                <Image
                    src={book.coverImage}
                    alt={book.title || 'Book Cover'} // Provide a fallback for alt text
                    width={imageWidth}
                    height={imageHeight}
                    className="product-card-image" // You might want a specific class for the Image component
                                                 // or ensure existing CSS targets this.
                    // objectFit="cover" // Optional: how the image should fit its container
                />
            ) : (
                // Optional: A placeholder if no image URL is provided
                <div className="no-image-placeholder" style={{ width: imageWidth, height: imageHeight }}>
                    No Image
                </div>
            )}
            <h6>{book.title}</h6>
            <div className="product-info">
                <p>{book.category}</p>
                <Link href="#">${book.price.toFixed(2)}</Link>
            </div>
        </div>
    );
}