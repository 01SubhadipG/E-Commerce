// src/pages/Wishlist.js or src/components/Wishlist.js

import React, { useContext } from 'react';
import { showContext } from '../context/showContext';
import { Link } from 'react-router-dom';
import { Loader2, Trash2, ShoppingBag, Heart } from 'lucide-react';

const Wishlist = () => {
  const { 
    wishlist = [], 
    cart = [], 
    currency, 
    isLoading, 
    toggleWishlistItem, 
    manageCartItem 
  } = useContext(showContext);

  // Handle the loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Handle the empty wishlist state
  if (!isLoading && wishlist.length === 0) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center items-center">
        <Heart size={48} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything to your wishlist yet.</p>
        <Link 
          to="/" 
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Display the wishlist items
  return (
    <section className="container mx-auto px-4 py-8 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const cartItem = cart.find(item => item._id === product._id);
          const quantityInCart = cartItem?.qty || 0;
          const defaultSize = product.sizes?.[0] || null;

          return (
            <div key={product._id} className="bg-white rounded-lg shadow flex flex-col group p-4">
              <Link to={`/product/${product._id}`} className="flex-grow">
                <div className="w-full h-56 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                  <img src={product.image?.[0]} alt={product.name} className="object-contain w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate group-hover:text-indigo-600 transition">{product.name}</h3>
                <p className="text-indigo-600 font-bold text-xl mb-4">{currency}{product.price}</p>
              </Link>

              <div className="w-full flex flex-col gap-2 mt-auto pt-4 border-t border-gray-100">
                {/* Add to Cart / Quantity Counter */}
                {quantityInCart === 0 ? (
                  <button
                    onClick={() => manageCartItem(product, defaultSize, 1)}
                    className="w-full px-4 py-2 rounded-full font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-full">
                    <button 
                      onClick={() => manageCartItem(product, defaultSize, -1)} 
                      className="px-4 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-full"
                    >-</button>
                    <span className="flex-grow text-center text-sm font-medium text-gray-800">{quantityInCart}</span>
                    <button 
                      onClick={() => manageCartItem(product, defaultSize, 1)} 
                      className="px-4 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-full"
                    >+</button>
                  </div>
                )}
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => toggleWishlistItem(product)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition text-sm text-red-600 bg-red-50 hover:bg-red-100"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Wishlist;