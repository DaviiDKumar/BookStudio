// src/app/layout.jsx

import Navbar from '@/components/Navbar';
import '../styles/globals.css'; // Import your global styles
import Footer from '@/components/Footer';


export const metadata = {
  title: 'My Books Website',
  description: 'Your next favorite book is here!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}