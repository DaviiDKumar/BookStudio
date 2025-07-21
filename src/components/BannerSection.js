'use client';

import React from 'react';
import '../styles/BannerSection.css';

export default function BannerSection() {
  return (
    <section className="banner-section">
      {/* Top Row */}
      <div className="banner-row top-row">
        <div className="banner-content">
          <h2>Curated Book Boxes</h2>
          <p>Discover monthly themed picks hand-selected by our editors.</p>
          <button className="banner-btn">Explore Boxes</button>
        </div>
        <div className="banner-image desktop-only top-image" />
      </div>

      {/* Bottom Row */}
      <div className="banner-row  bottom-row">
        <div className="banner-image desktop-only bottom-image" />
        <div className="banner-content">
          <h2>Artisan Journals</h2>
          <p>Hand-bound journals crafted for your thoughts and stories.</p>
          <button className="banner-btn">Shop Journals</button>
        </div>
      </div>
    </section>
  );
}
