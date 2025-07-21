'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'; // <--- Import the Image component
import "../styles/LatestBooks.css";

const LatestBooks = () => {
  const books = [
    {
      id: 1,
      image: 'https://placehold.co/120x160/F5E6CC/8B4513?text=Autumn+Leaves',
      category: 'JOURNAL',
      title: 'The Slow Journal',
      description: 'A guided journal to help you pause and reflect with prompts inspired by seasonal change.',
    },
    {
      id: 2,
      image: 'https://placehold.co/120x160/D1E8E2/2C3E50?text=Atomic+Love',
      category: 'FICTION',
      title: 'Atomic Love Letters',
      description: 'A haunting love story wrapped in Cold War espionage and personal redemption.',
    },
    {
      id: 3,
      image: 'https://placehold.co/120x160/C8D8E4/4A69BD?text=Winter+Calm',
      category: 'LIFESTYLE',
      title: 'The Art of Quiet',
      description: 'Explores the modern need for silence in a world that never stops shouting.',
    },
    {
      id: 4,
      image: 'https://placehold.co/120x160/F0F8FF/6A5ACD?text=New+Educators',
      category: 'EDUCATION',
      title: 'Modern Teaching Toolkit',
      description: 'A practical guide for new-age educators navigating digital-first classrooms.',
    },
    {
      id: 5,
      image: 'https://placehold.co/120x160/ECE4DB/3E2723?text=Design+Flow',
      category: 'DESIGN',
      title: 'Design for Deep Work',
      description: 'Create digital spaces that nurture focus, clarity, and calm interaction.',
    },
    {
      id: 6,
      image: 'https://placehold.co/120x160/DBF4A7/33691E?text=Green+Mind',
      category: 'SELF-HELP',
      title: 'Greener Thinking',
      description: 'Simple mindfulness and eco-conscious rituals to bring peace and purpose.',
    },
  ];

  return (
    <section className="homepage-section">
      <div className="header">
        <h2 className="title">Latest Books</h2>
        <button className="view-more-button btn-link">
          View more <ArrowRight size={16} />
        </button>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-image-container">
              {/* Changed <img> to <Image /> */}
              <Image
                src={book.image}
                alt={book.title}
                width={120}  // <--- Specify the intrinsic width
                height={160} // <--- Specify the intrinsic height
                className="book-image"
                // For external images like placehold.co, you need to configure next.config.js
                // onError is typically not needed with next/image as it handles fallbacks
                // If you still want a custom fallback, you can keep onError, but ensure the fallback is a local path or configured external domain.
              />
            </div>
            <div className="book-content">
              <span className="book-category">{book.category}</span>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-description">{book.description}</p>
              <button className=" buy-now-btn"><span className='buy-now-btn-span'>BUY NOW</span> <ArrowRight size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestBooks;