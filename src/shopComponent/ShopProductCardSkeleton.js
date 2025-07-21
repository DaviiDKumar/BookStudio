// components/ShopProductCardSkeleton.js
"use client";
import React from 'react';
import '../stylesShopComponent/ShopProductCardSkeleton.css'; // New CSS file for skeleton

export default function ShopProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-info">
        <div className="skeleton-category"></div>
        <div className="skeleton-price"></div>
      </div>
    </div>
  );
}