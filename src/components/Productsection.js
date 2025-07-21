'use client';

import React, { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/ProductSection.css';
import "../styles/utility.css"

const categories = [
  'Journals',
  'Kids Books',
  'Activity Books',
  'Fiction',
  'Non-Fiction',
  'Art & Design',
];

export default function ProductsSection() {
  const [books, setBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Journals');
  const [loading, setLoading] = useState(true);

  // Refs for navigation buttons
  const bestSellerPrevRef = useRef(null);
  const bestSellerNextRef = useRef(null);
  const topPickPrevRef = useRef(null);
  const topPickNextRef = useRef(null);
  const newestPrevRef = useRef(null);
  const newestNextRef = useRef(null);

  useEffect(() => {
    const cached = localStorage.getItem('booksData');
    if (cached) {
      setBooks(JSON.parse(cached));
      setLoading(false);
    } else {
      fetch('/api/products/all')
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
          localStorage.setItem('booksData', JSON.stringify(data));
        })
        .catch((err) => console.error('API error:', err))
        .finally(() => setLoading(false));
    }
  }, []);

  const inCategory = (book) =>
    book.categories?.some((c) =>
      c.toLowerCase().includes(activeCategory.toLowerCase())
    );

  const bestSellers = books.filter((b) => b.isBestSeller && inCategory(b));
  const topPicks = books.filter((b) => b.isBestPick && inCategory(b));
  const newest = books
    .filter(inCategory)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12);

  const renderSwiper = (title, list, keySuffix, prevRef, nextRef) => (
    <div className="product-subsection">
      <div className="subsection-header">
        <h3 className="product-subsection-title">{title}</h3>
        <div className="custom-nav-buttons">
          <button ref={prevRef} className="custom-swiper-btn prev-btn">‹</button>
          <button ref={nextRef} className="custom-swiper-btn next-btn">›</button>
        </div>
      </div>
      {list.length ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1440: { slidesPerView: 4.2 },
          }}
          className="product-swiper"
        >
          {list.map((b) => (
            <SwiperSlide key={b._id + keySuffix}>
              <ProductCard book={b} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="loading-text">No items found.</p>
      )}
    </div>
  );

  return (
    <section className="product-section">
      <h2 className="product-section-title">Browse Our Collection</h2>
    
      <div className="category-bar">

        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn btn-link ${cat === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
     
      <div className="category-bar">


        <Link href="" className="category-btn btn-outline " >Top Picks</Link>
        <Link href="" className="category-btn btn-outline " >Best Sellers</Link>
        <Link href="" className="category-btn  btn-outline" >Newest Collection</Link>

   

      </div>


      {loading ? (
        <p className="loading-text">Loading books...</p>
      ) : (
        <>
          {renderSwiper(`Best Sellers in ${activeCategory}`, bestSellers, 'bs', bestSellerPrevRef, bestSellerNextRef)}
          {renderSwiper(`Top Picks in ${activeCategory}`, topPicks, 'tp', topPickPrevRef, topPickNextRef)}
          {renderSwiper(`Newest ${activeCategory} Books`, newest, 'nw', newestPrevRef, newestNextRef)}
        </>
      )}
    </section>
  );
}
