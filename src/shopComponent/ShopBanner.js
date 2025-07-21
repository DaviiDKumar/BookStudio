// src/components/ShopBanner.js
'use client';

import React from 'react';
import Link from 'next/link'; // Assuming you're using Next.js Link for navigation
import '../stylesShopComponent/ShopBanner.css'; // Renamed CSS file

export default function ShopBanner() { // Renamed component
  return (
    <section className="shop-banner"> {/* Renamed class */}
      {/* Background Video */}
      <video
        className="shop-video" // Renamed class
        autoPlay
        loop
        muted
        playsInline // Ensures video plays on iOS devices
        poster="/images/banner-poster.jpg" // Path to a static image shown while video loads
      >
        <source src="/Bannervideo1.mp4" type="video/mp4" />
        {/* You can add more <source> tags for different video formats for wider browser support */}
        {/* <source src="/videos/book-banner.webm" type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>

      {/* Semi-transparent Overlay for text readability */}
      <div className="video-overlay"></div>

      {/* Content Layer (Headline, Sub-headline, CTA) */}
      <div className="shop-banner-content"> {/* Renamed class */}
        <h4>Unlock Your Next Great Story</h4>
        <p>Explore curated collections, find new worlds, and ignite your imagination.</p>
        <Link href="/shop" className="cta-button" aria-label="Shop All Books">
          Shop All Books
        </Link>
      </div>
    </section>
  );
}