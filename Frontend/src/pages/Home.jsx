import React, { useState } from 'react';
import heroImg from '../assets/react.svg';
import LatestCollection from '../components/latestCollection';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'; // Import the Heart icon
import InfiniteCarousel from '../components/InfiniteCarousel';
import BestSeller from '../components/BestSeller';

const carouselImages = [
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
];

const Home = () => {
  const [wishlist, setWishlist] = useState([]); // State to track wishlisted items

  // Function to add/remove items from the wishlist
  const toggleWishlist = (itemId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(itemId)
        ? prevWishlist.filter((id) => id !== itemId)
        : [...prevWishlist, itemId]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 flex flex-col items-center gap-6 md:gap-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center">
          Discover the Latest <span className="text-indigo-600">Trends</span> in Fashion
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
          Shop the newest arrivals, exclusive collections, and best deals for men, women, and kids. Upgrade your wardrobe today!
        </p>
        <InfiniteCarousel imageList={carouselImages} />
        <a href="/collections" className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 transition mt-2">Shop Now</a>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">-----Featured Categories-----</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <a href="/collections/men" className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <span className="text-3xl mb-2">👔</span>
            <span className="font-semibold text-gray-700">Men</span>
          </a>
          <a href="/collections/women" className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <span className="text-3xl mb-2">👗</span>
            <span className="font-semibold text-gray-700">Women</span>
          </a>
          <a href="/collections/kids" className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <span className="text-3xl mb-2">🧒</span>
            <span className="font-semibold text-gray-700">Kids</span>
          </a>
          <a href="/collections/accessories" className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <span className="text-3xl mb-2">👜</span>
            <span className="font-semibold text-gray-700">Accessories</span>
          </a>
        </div>
      </section>
      {/* LatestCollection */}
      <section className="container mx-auto px-4 py-8">
        <LatestCollection />
        </section>
      {/* Trending Products */}
      <section className="container mx-auto px-4 py-8">
        <BestSeller />
      </section>
    </div>
  );
};

export default Home;