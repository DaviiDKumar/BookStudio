'use client';

import React from 'react';
import Image from 'next/image';
import '../styles/BookCard.css'; // Corrected import path for the card's specific styles

// Helper function to render star ratings (included for completeness, but not directly used in the current layout)
// You can integrate this into the bookInfo section if you want to display ratings.
const StarRating = ({ rating, count }) => {
    // Ensure rating is a number and within 0-5 range
    const validRating = typeof rating === 'number' && rating >= 0 && rating <= 5 ? rating : 0;
    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 !== 0; // Check if there's a fractional part for a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Calculate remaining empty stars

    return (
        <div className="bookRating" aria-label={`Average rating: ${validRating.toFixed(1)} out of 5 stars`}>
            {/* Render full stars */}
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} aria-hidden="true">★</span>
            ))}
            {/* Render half star if applicable */}
            {halfStar && <span aria-hidden="true" className="half-star">★</span>} {/* Unicode for half star */}
            {/* Render empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} aria-hidden="true" className="empty-star">★</span>
            ))}
            {count && <span className="ratingCount">({count})</span>}
        </div>
    );
};

// Skeleton card for loading states, providing a visual placeholder
export const BookSkeletonCard = () => (
    <div className="bookCard skeleton-card">
        <div className="bookCardTop skeleton-card-top">
            <div className="bookImageContainer skeleton-image"></div>
            <div className="bookInfo skeleton-top-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-author"></div>
            </div>
        </div>
        <div className="bookCardBottom skeleton-card-bottom">
            <div className="skeleton-price"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-availability-badges">
                <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-button"></div>
        </div>
    </div>
);


// Main BookCard component
const BookCard = ({ book }) => {
    const { volumeInfo, saleInfo } = book;

    const defaultCover = 'https://placehold.co/128x192/E0E0E0/333333?text=No+Cover';
    const imageUrl = volumeInfo?.imageLinks?.thumbnail || volumeInfo?.imageLinks?.smallThumbnail || defaultCover;

    let priceDisplay = '';
    let priceClass = '';
    let availabilityBadge = null;
    let availabilityClass = '';

    if (saleInfo?.listPrice?.amount && saleInfo.listPrice.currencyCode) {
        priceDisplay = `Price: ${saleInfo.listPrice.currencyCode} ${saleInfo.listPrice.amount.toFixed(2)}`;
        priceClass = 'actual-price';
        availabilityBadge = <span className="availabilityBadge hardcopy-badge">Available for Purchase</span>; // If a price, assume purchasable
        availabilityClass = 'available-hardcopy';
    } else if (saleInfo?.retailPrice?.amount && saleInfo.retailPrice.currencyCode) {
        priceDisplay = `Price: ${saleInfo.retailPrice.currencyCode} ${saleInfo.retailPrice.amount.toFixed(2)}`;
        priceClass = 'actual-price';
        availabilityBadge = <span className="availabilityBadge hardcopy-badge">Available for Purchase</span>;
        availabilityClass = 'available-hardcopy';
    } else if (saleInfo?.saleability === 'FREE') {
        priceDisplay = 'Free E-book';
        priceClass = 'free-ebook';
        availabilityBadge = <span className="availabilityBadge free-ebook-badge">Free E-book</span>;
        availabilityClass = 'available-free';
    } else {
        // If no explicit price or "FOR_SALE" status, check other conditions
        priceDisplay = 'Ebook Available';
        priceClass = 'not-for-sale';

        // Check if it's an Ebook (even if not explicitly FOR_SALE with price)
        // Or if it's explicitly marked as 'FOR_SALE' but without a price (could be an Ebook with just a link)
        if (saleInfo?.isEbook || saleInfo?.saleability === 'FOR_SALE') {
            availabilityBadge = <span className="availabilityBadge ebook-badge">Ebook Available</span>; // More generic for ebook
            availabilityClass = 'available-ebook';
        }
        // If not for sale, not free, and not explicitly an ebook, assume hardcopy if printType is BOOK
        else if (volumeInfo?.printType === 'BOOK') {
            availabilityBadge = <span className="availabilityBadge hardcopy-badge">Available in Hardcopy</span>;
            availabilityClass = 'available-hardcopy';
        }
        // Default to 'Not Available' if none of the above conditions are met
        else {
            availabilityBadge = <span className="availabilityBadge generic-not-available">Not Available</span>;
            availabilityClass = 'not-available';
        }
    }

    // Process author names for display and truncation
    const authors = volumeInfo?.authors && volumeInfo.authors.length > 0
        ? volumeInfo.authors.join(', ')
        : 'Unknown Author';

    const maxAuthorLength = 80; // Approximate character limit for 2 lines, adjust as needed
    const truncatedAuthors = authors.length > maxAuthorLength
        ? authors.substring(0, maxAuthorLength) + '...'
        : authors;


    return (
        <div className="bookCard">
            <div className="bookCardTop">
                <div className="bookImageContainer">
                    <Image
                        src={imageUrl}
                        alt={volumeInfo?.title || 'Book Cover'}
                        width={128} // Google Books standard thumbnail width
                        height={192} // Google Books standard thumbnail height
                        className="bookImage"
                        unoptimized={imageUrl.includes('placehold.co')}
                        priority={true}
                    />
                </div>

                <div className="bookInfo">
                    <p className="bookTitle">{volumeInfo?.title || 'No Title Available'}</p>
                    <p className="bookAuthor">
                        by: {truncatedAuthors}
                    </p>
                    {volumeInfo?.averageRating && (
                        <div className="ratingAndCount">
                            <StarRating
                                rating={volumeInfo.averageRating}
                                count={volumeInfo.ratingsCount || 0}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="bookCardBottom">
                <p className={`bookPrice ${priceClass}`}>{priceDisplay}</p>

             
                <p className="bookDescription">
                    {volumeInfo?.description
                        ? volumeInfo.description.length > 250
                            ? volumeInfo.description.substring(0, 250) + '...'
                            : volumeInfo.description
                        : 'No description available.'}
                </p>

                <button
                    className="viewDetailsButton"
                    onClick={() => window.open(volumeInfo?.infoLink, '_blank')}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default BookCard;