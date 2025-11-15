import React, { useContext, useState, useMemo, useCallback } from 'react';
import { showContext } from '../context/showContext';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Loader2, Frown } from 'lucide-react';

// --- Constants ---
const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'Accessories'];
const SORT_OPTIONS = { NEWEST: 'newest', PRICE_ASC: 'price-asc', PRICE_DESC: 'price-desc', NAME_ASC: 'name-asc' };
const PRICE_RANGES = [
  { key: 'all', label: 'All Prices', min: null, max: null },
  { key: '0-50', label: '$0 - $50', min: 0, max: 50 },
  { key: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { key: '100-200', label: '$100 - $200', min: 100, max: 200 },
  { key: '200+', label: 'Over $200', min: 200, max: null },
];

// --- Main Component ---
const Collections = () => {
  // Destructure all necessary state and functions from the context
  const { 
    products, 
    isLoading, 
    currency = '$',
    cart = [],
    wishlist = [],
    manageCartItem,
    addOrUpdateCartItem,
    toggleWishlistItem
  } = useContext(showContext);

  const navigate = useNavigate();

  const [category, setCategory] = useState('All');
  const [priceRangeKey, setPriceRangeKey] = useState(PRICE_RANGES[0].key);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);

  const resetFilters = useCallback(() => {
    setCategory('All');
    setPriceRangeKey(PRICE_RANGES[0].key);
    setSortBy(SORT_OPTIONS.NEWEST);
  }, []);

  const filtered = useMemo(() => {
    let list = Array.isArray(products) ? [...products] : [];
    if (category && category !== 'All') {
      list = list.filter(p => p.category === category);
    }
    const selectedRange = PRICE_RANGES.find(r => r.key === priceRangeKey);
    if (selectedRange && selectedRange.key !== 'all') {
        const { min, max } = selectedRange;
        if (min !== null) list = list.filter(p => Number(p.price) >= min);
        if (max !== null) list = list.filter(p => Number(p.price) <= max);
    }
    switch (sortBy) {
      case SORT_OPTIONS.PRICE_ASC: list.sort((a, b) => a.price - b.price); break;
      case SORT_OPTIONS.PRICE_DESC: list.sort((a, b) => b.price - a.price); break;
      case SORT_OPTIONS.NAME_ASC: list.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
      default: list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break; // Assumes dateAdded property
    }
    return list;
  }, [products, category, priceRangeKey, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${category === cat ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>
        {/* Sort and Price Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={priceRangeKey} onChange={e => setPriceRangeKey(e.target.value)} aria-label="Filter by price" className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none">
            {PRICE_RANGES.map(range => <option key={range.key} value={range.key}>{range.label}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort products by" className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none">
            <option value={SORT_OPTIONS.NEWEST}>Newest</option>
            <option value={SORT_OPTIONS.PRICE_ASC}>Price: Low to High</option>
            <option value={SORT_OPTIONS.PRICE_DESC}>Price: High to Low</option>
            <option value={SORT_OPTIONS.NAME_ASC}>Name A → Z</option>
          </select>
        </div>
        {/* Reset and Count */}
        <div className="flex items-center gap-4 pt-2">
          <button onClick={resetFilters} className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-semibold hover:bg-gray-700 transition">Reset Filters</button>
          <div className="text-sm font-medium text-gray-600">{filtered.length} product(s) found</div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20"><Loader2 className="w-12 h-12 animate-spin text-indigo-600" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Frown className="mx-auto w-16 h-16 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-700">No Products Found</h2>
          <p className="mt-2 text-gray-500">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => {
            const isInWishlist = wishlist.some(item => item._id === product._id);
            const cartItem = cart.find(item => item._id === product._id);
            const quantityInCart = cartItem?.qty || 0;
            const defaultSize = product.sizes?.[0] || null;

            return (
              <div key={product._id} className="flex flex-col">
                <div className="relative bg-white rounded-lg shadow p-4 flex flex-col items-stretch hover:shadow-lg transition group h-full">
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlistItem(product); }} className={`absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm transition-all duration-200 z-10 ${isInWishlist ? 'opacity-100 text-red-500 scale-110' : 'opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500'}`} type="button">
                    <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                  </button>
                  
                  <Link to={`/product/${product._id}`} className="flex-1 flex flex-col">
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                      <img src={product.image?.[0]} alt={product.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="text-indigo-600 font-bold">{currency}{product.price}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </Link>

                  <div className="w-full flex flex-col gap-2 mt-auto pt-3">
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addOrUpdateCartItem(product, defaultSize); navigate('/cart'); }}
                      className="w-full px-4 py-2 bg-gray-800 text-white rounded-full font-semibold hover:bg-black transition"
                    >
                      Buy Now
                    </button>
                    
                    {quantityInCart === 0 ? (
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); manageCartItem(product, defaultSize, 1); }}
                        className="w-full px-4 py-2 rounded-full font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-full">
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); manageCartItem(product, defaultSize, -1); }} className="px-4 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-full">-</button>
                        <span className="flex-grow text-center text-sm font-medium text-gray-800">{quantityInCart}</span>
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); manageCartItem(product, defaultSize, 1); }} className="px-4 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-full">+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Collections;