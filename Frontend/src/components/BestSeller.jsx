import React, { useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';
import { showContext } from '../context/showContext';

// --- Main Component ---
const BestSeller = () => {
  const { 
    products, 
    isLoading, 
    currency = '$', 
    cart = [], 
    manageCartItem, 
    addOrUpdateCartItem,
    wishlist = [],
    toggleWishlistItem
  } = useContext(showContext);
  
  const navigate = useNavigate();

  const bests = useMemo(() => {
    return (products || []).filter(p => p.bestseller).slice(0, 8);
  }, [products]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!bests.length) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bests.map(product => {
          const cartItem = cart.find(item => item._id === product._id);
          const quantityInCart = cartItem?.qty || 0;
          const defaultSize = product.sizes?.[0] || null;
          const isInWishlist = wishlist.find(item => item._id === product._id);
          
          return (
            <div key={product._id} className="flex flex-col">
              <div className="relative bg-white rounded-lg shadow p-4 flex flex-col items-stretch hover:shadow-lg transition group h-full">
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlistItem(product); }}
                  className={`absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm transition-all duration-200 z-10 ${isInWishlist ? 'opacity-100 text-red-500 scale-110' : 'opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500'}`}
                  aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  type="button"
                >
                  <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>

                <Link to={`/product/${product._id}`} className="flex-1 flex flex-col">
                  <div className="w-full h-56 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                    <img src={product.image?.[0]} alt={product.name} className="object-contain w-full h-full" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate text-center">{product.name}</h3>
                  <p className="text-indigo-600 font-bold text-xl text-center mb-2">{currency}{product.price}</p>
                </Link>

                <div className="w-full flex flex-col gap-2 mt-auto pt-3">
                  <button
                    type="button"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      addOrUpdateCartItem(product, defaultSize);
                      navigate('/cart');
                    }}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-full font-semibold hover:bg-black transition"
                  >
                    Buy Now
                  </button>
                  
                  {quantityInCart === 0 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        manageCartItem(product, defaultSize, 1);
                      }}
                      className="w-full px-4 py-2 rounded-full font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-full">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); manageCartItem(product, defaultSize, -1); }} 
                        className="px-4 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-full"
                      >-</button>
                      <span className="flex-grow text-center text-sm font-medium text-gray-800">{quantityInCart}</span>
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); manageCartItem(product, defaultSize, 1); }} 
                        className="px-4 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-full"
                      >+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSeller;