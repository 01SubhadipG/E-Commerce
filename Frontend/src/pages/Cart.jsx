// src/pages/Cart.js or src/components/Cart.js

import React, { useContext, useMemo } from 'react';
import { showContext } from '../context/showContext';
import { Link } from 'react-router-dom';
import { Loader2, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { 
    cart = [], 
    currency, 
    isLoading, 
    manageCartItem,
    delivery_fee = 0
  } = useContext(showContext);

  // Calculate the subtotal of all items in the cart
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  }, [cart]);

  const total = subtotal + delivery_fee;

  // Handle the loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Handle the empty cart state
  if (!isLoading && cart.length === 0) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center items-center">
        <ShoppingBag size={48} className="text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h1>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/" 
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          {/* IMPROVEMENT: Added icon for consistency */}
          <ShoppingBag size={18} /> 
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List (Left Column) */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 space-y-6">
            {cart.map((item) => (
              <div key={`${item._id}-${item.selectedSize}`} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-6 last:border-b-0">
                <Link to={`/product/${item._id}`} className="flex-shrink-0">
                  <img src={item.image?.[0]} alt={item.name} className="w-24 h-24 object-contain rounded-md bg-gray-100" />
                </Link>
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/product/${item._id}`} className="font-semibold text-gray-800 hover:text-indigo-600">{item.name}</Link>
                  {item.selectedSize && <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>}
                </div>
                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button onClick={() => manageCartItem(item, item.selectedSize, -1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                    <span className="px-4 text-center text-sm font-medium text-gray-800">{item.qty}</span>
                    <button onClick={() => manageCartItem(item, item.selectedSize, 1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
                  </div>
                  {/* Price */}
                  <p className="font-semibold w-20 text-center">{currency}{(item.price * item.qty).toFixed(2)}</p>
                  {/* Remove Button */}
                  <button 
                    onClick={() => manageCartItem(item, item.selectedSize, -item.qty)} // Set qty to 0 to remove
                    className="text-gray-400 hover:text-red-500 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{currency}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">{currency}{delivery_fee.toFixed(2)}</span>
                </div>
                <div className="border-t my-3"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{currency}{total.toFixed(2)}</span>
                </div>
              </div>
              {/* FIXED: Changed <link> to <Link> to make it a functional React Router link */}
              <Link to="/placeorder" className="mt-6 block w-full text-center px-4 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">
                Proceed to Checkout
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cart;