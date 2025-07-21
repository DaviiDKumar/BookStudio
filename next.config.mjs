/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'books.google.com', // Already added for Google Books images
      'placehold.co',     // Add this line for the fallback image
    ],
  },
};

export default nextConfig;