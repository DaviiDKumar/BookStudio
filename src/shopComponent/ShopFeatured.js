// src/components/ShopFeatured.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For optimized images
import '../stylesShopComponent/ShopFeatured.css'; // New CSS for this section

// --- Featured Books Data (Hardcoded for "Our Picks" section) ---
const featuredBooks = [
    {
        id: 'feat1',
        title: 'The Silent Pages: A Detective Anya Sharma Mystery',
        image: '/shopbook5.jpg', // Use actual image paths from your public directory
        price: 28.99,
        category: 'Mystery',
        shortDescription: 'A gripping tale of an unsolved disappearance that spans decades.',
        whyItStandsOut: 'Masterful suspense, unforgettable characters & a twist you won\'t see coming!',
        longDescription: 'From the critically acclaimed author, "The Silent Pages" delves into the mysterious vanishing of a renowned historian, leaving behind only cryptic notes. Detective Anya Sharma must piece together fragments of the past, navigating a labyrinth of secrets, old feuds, and long-buried truths. A must-read for fans of classic whodunits with a modern psychological twist. Perfect for a cozy night in, it will keep you guessing until the very last page.',
        link: '/books/silent-pages' // Example link to a detailed page
    },
    {
        id: 'feat2',
        title: 'Zen Gardens: A Guide to Tranquility and Inner Peace',
        image: '/shopbook3.jpg',
        price: 22.50,
        category: 'Non-Fiction',
        shortDescription: 'Discover the art and philosophy behind Japanese rock gardens.',
        whyItStandsOut: 'Stunning photography and practical meditation exercises for daily calm.',
        longDescription: '"Zen Gardens" is more than a book; it\'s a journey into mindfulness. This comprehensive guide explores the history, design principles, and spiritual significance of traditional Japanese rock gardens. Featuring stunning photography and step-by-step instructions for creating your own miniature zen space, it also includes guided meditations to help you find inner peace in a chaotic world. Perfect for stress relief and aesthetic appreciation.',
        link: '/books/zen-gardens'
    },
    {
        id: 'feat3',
        title: 'The Inventor\'s Notebook: Unleash Your Creative Mind',
        image: '/shopbook1.jpg',
        price: 15.99,
        category: 'Activity Books',
        shortDescription: 'Unleash your creativity with prompts and challenges for budding inventors.',
        whyItStandsOut: 'Interactive, encourages critical thinking & sparks innovation in all ages.',
        longDescription: 'Designed for curious minds of all ages, "The Inventor\'s Notebook" is your personal space for brainstorming and problem-solving. Filled with imaginative prompts, design challenges, and space to sketch out your wildest ideas, this book goes beyond simple drawing. It encourages users to think like engineers, artists, and innovators, turning abstract concepts into tangible plans. A perfect gift for anyone who loves to create and question.',
        link: '/books/inventors-notebook'
    }
];

export default function ShopFeatured() {
    return (
        <section className="shop-featured-section">
            <div className="section-header">
                <h2 className="section-heading">Our Picks</h2>
                <p className="section-subheading">✨ Most hidden gems books here ✨</p>
                <p className="swipe-indicator">Swipe to see all 👉</p>
            </div>

            <div className="featured-books-grid">
                {featuredBooks.map((book, index) => (
                    <div
                        key={book.id}
                        className={`featured-book-card ${index % 2 !== 0 ? 'featured-book-card--reversed' : ''}`}
                    >
                        {/* Image Section */}
                        <div className="featured-book-image-wrapper">
                            <Link href={book.link} className="featured-book-link">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    width={400} // Adjust intrinsic width
                                    height={550} // Adjust intrinsic height for aspect ratio (e.g., ~3:4)
                                    layout="responsive" // Video will scale, but aspect ratio defined by width/height
                                    objectFit="cover"
                                    className="featured-book-image"
                                />
                            </Link>
                        </div>

                        {/* Content Section */}
                        <div className="featured-book-info">
                            <Link href={book.link}>
                                <h3 className="featured-book-title">{book.title}</h3>
                            </Link>
                            <p className="featured-book-price">${book.price.toFixed(2)}</p>
                            <p className="featured-book-short-desc">{book.shortDescription}</p>

                            <div className="stands-out">
                                <strong>Why it stands out:</strong>
                                <p>{book.whyItStandsOut}</p>
                            </div>

                            <p className="featured-book-long-desc">{book.longDescription}</p>

                            <Link href={book.link} className="read-more-button">
                                Read More & Shop
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Optional CTA to view more featured items or go to main shop */}
            <div className="view-all-cta">
                <Link href="#shop" className="cta-button">
                    View All Books
                </Link>
            </div>
        </section>
    );
}