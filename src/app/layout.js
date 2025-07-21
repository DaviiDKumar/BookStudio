// src/app/layout.jsx

import Navbar from '@/components/Navbar';
import '../styles/globals.css'; // Import your global styles
import Footer from '@/components/Footer';

// --- OPTIMIZED GOOGLE FONT IMPORTS ---
// Import each font you use from next/font/google
import { Inter, Playfair_Display, Alegreya_SC, Luckiest_Guy, Passero_One, Ubuntu } from 'next/font/google';

// Configure each font, matching the weights and styles you use in your CSS
// The 'variable' property creates a CSS variable that you can then use in your CSS
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--ff-sans', // Matches your CSS variable name
  display: 'swap', // Ensures text is visible during font load
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--ff-serif', // Matches your CSS variable name
  display: 'swap',
});

const alegreyaSC = Alegreya_SC({
  subsets: ['latin'],
  weight: '700', // Only 700 is used in your CSS for Alegreya SC
  variable: '--ff-heading', // Matches your CSS variable name
  display: 'swap',
});

const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400', // Only 400 is used in your CSS for Luckiest Guy
  variable: '--ff-bold-display', // Matches your CSS variable name
  display: 'swap',
});

const passeroOne = Passero_One({
  subsets: ['latin'],
  weight: '400', // Only 400 is used in your CSS for Passero One
  variable: '--ff-funky', // Matches your CSS variable name
  display: 'swap',
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'], // Match the weights you use for Ubuntu
  variable: '--ff-body', // Matches your CSS variable name
  display: 'swap',
});
// --- END OPTIMIZED GOOGLE FONT IMPORTS ---


export const metadata = {
  title: 'My Books Website',
  description: 'Your next favorite book is here!',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // Add the data-scroll-behavior attribute to address the Next.js warning
      data-scroll-behavior="smooth"
      // Apply the font variable classes to the <html> element
      className={`${inter.variable} ${playfairDisplay.variable} ${alegreyaSC.variable} ${luckiestGuy.variable} ${passeroOne.variable} ${ubuntu.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}