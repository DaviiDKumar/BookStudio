'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import '../styles/LandingPage.css';
import '../styles/utility.css';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const LandingPage = () => {
  return (
    <motion.section className="landing-section" initial="hidden" whileInView="show" viewport={{ once: true }}>

      <motion.div className="landing-page-top" variants={containerVariants}>

        {/* LEFT SIDE */}
        <motion.div className="landing-page-top-left" variants={slideLeft}>

          <motion.div className="landing-page-top-left-heading" variants={fadeUp}>
            <h1 className="landing-page-title">Skip The Bestsellers</h1>
            <h4>
              <b>Find the Ones That Deserve It</b><br />
              <b>A collection that reads beautifully and looks even better</b><br />
            </h4>

            <p>
              Discover journals crafted with care — perfect for keeping your thoughts safe, your ideas sacred, and your stories beautifully captured. Whether you’re a writer, thinker, or dreamer, our collection offers unique designs that inspire creativity and reflection.
            </p>
          </motion.div>

          <motion.div className="landing-page-buttons" variants={fadeUp}>
            <button className="btn-landing-page btn-solid">Explore Books</button>
            <button className="btn-landing-page btn-outline">Browse Collection</button>
          </motion.div>

          <div className="landing-page-support-img">
            <motion.div variants={slideLeft}>
              <Image src="/miniposter2.jpg" alt="Support Poster 1" width={120} height={180} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Image src="/poster2.jpg" alt="Support Poster 2" width={120} height={180} />
            </motion.div>
            <motion.div variants={slideRight}>
              <Image src="/miniposter3.jpg" alt="Support Poster 3" width={120} height={180} />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div className="landing-page-top-right" variants={slideRight}>
          <div className="poster-content">
            <span className="poster-tag">Book of the Week</span>
            <h2 className="poster-title">Book Studio Pink Journal</h2>
            <div className="poster-price">
              <span className="discounted-price">ONLY ₹399</span>
              <span className="original-price">₹599</span>
            </div>
            <button className="poster-button">Buy Now</button>
          </div>
        </motion.div>

      </motion.div>
    </motion.section>
  );
};

export default LandingPage;
