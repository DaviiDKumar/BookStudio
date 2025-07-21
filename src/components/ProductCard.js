'use client';

import React from 'react';
import Image from 'next/image'; // <--- Import the Image component
import '../styles/ProductCard.css';

export default function ProductCard({ book }) {
  const {
    title,
    authors = [],
    thumbnailUrl,
    price,
    averageRating
  } = book;

  // Define default width and height for the book cover thumbnail.
  // You might need to adjust these values based on the typical aspect ratio
  // and desired display size of your book cover thumbnails.
  const imageWidth = 200; // Example width in pixels
  const imageHeight = 300; // Example height in pixels (common book cover aspect ratio)

  return (
    <div className="product-card">
      <div className="product-card-img">
        {/* Replaced <img> with <Image /> */}
        {thumbnailUrl ? ( // Conditionally render Image if thumbnailUrl exists
          <Image
            src={thumbnailUrl}
            alt={title || 'Book Cover'} // Provide a fallback for alt text if title is missing
            width={imageWidth}
            height={imageHeight}
            className="product-image" // You might want a specific class for the Image component
                                      // or adapt .product-card-img img styles
            // 'objectFit' can be useful if your CSS isn't handling sizing perfectly
            // objectFit="cover" // or "contain" depending on how you want it to scale within its container
          />
        ) : (
          // Optional: Fallback content if no thumbnail URL is available
          <div className="no-image-placeholder" style={{ width: imageWidth, height: imageHeight }}>
            No Image Available
          </div>
        )}
      </div>
      <div className="product-card-body">
        <h3 className="product-title">{title}</h3>
        <p className="product-author">by : {authors?.[0] || 'Unknown Author'}</p>
        <p className="product-price">
          {price?.currencyCode || '$'} {price?.amount?.toFixed(2) || '0.00'}
        </p>
        <p className="product-rating">⭐ {averageRating ?? 'N/A'}</p>
        <div className="product-card-footer">
          <button className="product-btn">View Details</button>
        </div>
      </div>
    </div>
  );
}