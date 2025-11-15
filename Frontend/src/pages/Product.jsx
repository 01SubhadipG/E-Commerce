import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { showContext } from '../context/showContext';
import { Heart, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

// --- Main Component ---
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    products, 
    isLoading, 
    currency, 
    cart = [], 
    manageCartItem, 
    addOrUpdateCartItem,
    wishlist = [],
    toggleWishlistItem
  } = useContext(showContext);
  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState('');

  useEffect(() => {
    if (!isLoading && products) {
      const found = products.find(p => p._id === id);
      setProduct(found || null);
      if (found) {
        setActiveImage(0);
        setSelectedSize(found.sizes?.[0] || null);
        // This ensures the window is at the top when the component loads/updates
        window.scrollTo(0, 0); 
      }
    }
  }, [id, products, isLoading]);
  
  const related = useMemo(() => {
    if (!product) return [];
    return (products || []).filter(p => p._id !== product._id && p.category === product.category).slice(0, 4);
  }, [product, products]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError('Please select a size.');
      setTimeout(() => setSizeError(''), 3000);
      return;
    }
    addOrUpdateCartItem(product, selectedSize);
    navigate('/cart');
  }, [product, selectedSize, addOrUpdateCartItem, navigate]);
  
  const handleRelatedBuyNow = useCallback((relatedProduct) => {
    addOrUpdateCartItem(relatedProduct, relatedProduct.sizes?.[0] || null);
    navigate('/cart');
  }, [addOrUpdateCartItem, navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-indigo-600" /></div>;
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"><ArrowLeft size={18} /> Go Back</Link>
      </div>
    );
  }

  const hasSizes = product.sizes && product.sizes.length > 0;
  const isActionDisabled = hasSizes && !selectedSize;
  
  const cartItem = cart.find(item => item._id === product._id && item.selectedSize === selectedSize);
  const quantityInCart = cartItem?.qty || 0;
  const isInWishlist = wishlist.some(item => item._id === product._id);

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* --- THIS IS THE NEW BACK BUTTON --- */}
      <button 
        onClick={() => {navigate(-1);
          window.scrollTo({top:0,
            left: 0,
          behavior: 'smooth'
          })
        }} 
        className="inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600 mb-6 font-semibold transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="bg-white rounded-lg shadow p-4 sticky top-24">
            <div className="w-full h-96 bg-gray-100 rounded overflow-hidden flex items-center justify-center mb-4">
              <img src={product.image?.[activeImage]} alt={product.name} className="object-contain w-full h-full" />
            </div>
            {product.image && product.image.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.image.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)} className={`w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${idx === activeImage ? 'border-indigo-500' : 'border-transparent'}`}>
                    <img src={img} alt={`${product.name}-${idx}`} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.subCategory} • {product.category}</p>
            <div className="text-3xl font-bold text-indigo-600 mb-4">{currency}{product.price}</div>
            
            {hasSizes && (
              <div className="mb-6">
                <h4 className="font-medium mb-2 text-gray-800">Select size</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => { setSelectedSize(size); setSizeError(''); }} className={`px-4 py-2 border rounded-md font-medium text-sm transition-colors ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizeError && <div className="flex items-center gap-2 text-red-600 text-sm mb-3"><AlertCircle size={16} />{sizeError}</div>}
            
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button onClick={handleBuyNow} className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-md font-semibold hover:bg-black transition disabled:opacity-50" disabled={isActionDisabled}>Buy Now</button>
              
              <div className="flex-1">
                {quantityInCart === 0 ? (
                  <button onClick={() => manageCartItem(product, selectedSize, 1)} className="w-full h-full px-6 py-3 rounded-md font-medium transition bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" disabled={isActionDisabled}>
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-center w-full h-full border border-gray-300 rounded-md">
                    <button onClick={() => manageCartItem(product, selectedSize, -1)} className="px-5 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50" disabled={isActionDisabled}>-</button>
                    <span className="flex-grow text-center text-lg font-medium text-gray-800">{quantityInCart}</span>
                    <button onClick={() => manageCartItem(product, selectedSize, 1)} className="px-5 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50" disabled={isActionDisabled}>+</button>
                  </div>
                )}
              </div>
              
              <button onClick={() => toggleWishlistItem(product)} className={`px-4 py-2 rounded-md border transition-colors flex items-center gap-2 whitespace-nowrap ${isInWishlist ? 'text-red-500 bg-red-50 border-red-200' : 'text-gray-600 bg-white hover:bg-gray-100'}`}>
                <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} /> {isInWishlist ? 'Saved' : 'Save'}
              </button>
            </div>
            
            <div className="mt-6 border-t pt-4">
              <h4 className="font-medium mb-2 text-gray-800">Product Description</h4>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
          
          {related.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">You May Also Like</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {related.map(r => {
                  const isRelatedInWishlist = wishlist.some(item => item._id === r._id);
                  const relatedCartItem = cart.find(item => item._id === r._id);
                  const relatedQuantityInCart = relatedCartItem?.qty || 0;
                  const relatedDefaultSize = r.sizes?.[0] || null;

                  return (
                    <div key={r._id} className="bg-white rounded-lg shadow flex flex-col group">
                      <Link to={`/product/${r._id}`} className="relative p-3">
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlistItem(r); }} className={`absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm transition-all z-10 ${isRelatedInWishlist ? 'opacity-100 text-red-500' : 'opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500'}`}>
                          <Heart size={18} fill={isRelatedInWishlist ? 'currentColor' : 'none'} />
                        </button>
                        <div className="w-full h-40 bg-gray-100 rounded overflow-hidden mb-2 flex items-center justify-center">
                          <img src={r.image?.[0]} alt={r.name} className="object-contain w-full h-full" />
                        </div>
                        <div className="text-sm font-medium text-gray-800 truncate">{r.name}</div>
                        <div className="text-indigo-600 font-bold">{currency}{r.price}</div>
                      </Link>
                      <div className="w-full flex flex-col gap-2 p-3 pt-0 mt-auto">
                        <button type="button" onClick={() => handleRelatedBuyNow(r)} className="w-full px-3 py-2 text-sm bg-gray-800 text-white rounded-full font-semibold hover:bg-black transition">
                          Buy Now
                        </button>

                        {relatedQuantityInCart === 0 ? (
                          <button 
                            onClick={(e) => {e.preventDefault(); e.stopPropagation(); manageCartItem(r, relatedDefaultSize, 1)}} 
                            className="w-full px-3 py-2 text-sm rounded-full font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-full">
                            <button onClick={(e) => {e.preventDefault(); e.stopPropagation(); manageCartItem(r, relatedDefaultSize, -1)}} className="px-4 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-full">-</button>
                            <span className="flex-grow text-center text-sm font-medium text-gray-800">{relatedQuantityInCart}</span>
                            <button onClick={(e) => {e.preventDefault(); e.stopPropagation(); manageCartItem(r, relatedDefaultSize, 1)}} className="px-4 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-full">+</button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;