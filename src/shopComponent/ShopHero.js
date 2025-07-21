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
                {/* Replaced <img> with <Image /> */}
                {/* IMPORTANT: Replace width and height with the actual dimensions of your /shop2.jpg */}
                <Image
                    src="/shop2.jpg"
                    alt="Open book surrounded by golden light, symbolizing a good deal on books" // Improved alt text
                    width={600}  // Placeholder: Replace with actual width of shop2.jpg
                    height={400} // Placeholder: Replace with actual height of shop2.jpg
                    className="shop-hero-image" // Add a class for specific styling if needed
                />
                {/* Replaced <img> with <Image /> */}
                {/* IMPORTANT: Replace width and height with the actual dimensions of your /shop3.jpg */}
                <Image
                    src="/shop3.jpg"
                    alt="Stack of vintage books with a bookmark, symbolizing a timeless offer" // Improved alt text
                    width={600}  // Placeholder: Replace with actual width of shop3.jpg
                    height={400} // Placeholder: Replace with actual height of shop3.jpg
                    className="shop-hero-image" // Add a class for specific styling if needed
                />
            </div>
        </section>
    );
};