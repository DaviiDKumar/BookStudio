// src/components/ShopHero.jsx

'use client';

import React from "react";
import Image from "next/image"; // <--- Import the Image component
import { MdAccessTime, MdLocalOffer } from "react-icons/md";
import "../stylesShopComponent/ShopHero.css";

export const ShopHero = () => {
    return (
        <section className="shop-hero" id="shop">
            <div className="shop-hero-left">
                <h2 className="shop-hero-left-title">
                    A Good Deal <b>Doesn’t</b> Wait
                </h2>
                <h2 className="shop-hero-left-subtitle">
                    <MdAccessTime className="shop-icon" /> Neither Should You
                </h2>
            </div>

            <div className="shop-hero-right">
                <Image
                    src="/shop2.jpg"
                    alt="Open book surrounded by golden light, symbolizing a good deal on books"
                    // IMPORTANT: Replace with ACTUAL WIDTH of shop2.jpg
                    width={800}
                    // IMPORTANT: Replace with ACTUAL HEIGHT of shop2.jpg
                    height={533}
                    className="shop-hero-image"
                    style={{ objectFit: 'cover' }} // <--- Apply object-fit via style prop
                    // Add priority if this image is also above the fold and critical
                    // priority={true}
                />
                <Image
                    src="/shop3.jpg"
                    alt="Stack of vintage books with a bookmark, symbolizing a timeless offer"
                    // IMPORTANT: Replace with ACTUAL WIDTH of shop3.jpg
                    width={800}
                    // IMPORTANT: Replace with ACTUAL HEIGHT of shop3.jpg
                    height={533}
                    className="shop-hero-image"
                    style={{ objectFit: 'cover' }} // <--- Apply object-fit via style prop
                    priority // <--- Add priority if it's the one loading late and is above the fold
                />
            </div>
        </section>
    );
};