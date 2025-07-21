'use client';

import React from 'react';
import Link from 'next/link';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Book Studio</h2>
          <p>Your cozy corner for handpicked journals & rare finds.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/journals">Journals</Link></li>
              <li><Link href="/best-sellers">Best Sellers</Link></li>
              <li><Link href="/new-arrivals">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Stay in the loop</h4>
          <form>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Book Studio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
