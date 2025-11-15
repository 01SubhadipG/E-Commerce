import { createContext, useEffect, useState, useCallback } from "react";
import { products as initialProducts } from "../assets/frontend_assets/assets";

export const showContext = createContext(null);

// --- Helper function to get initial state from localStorage ---
const getInitialState = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

const ShowProvider = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  const [cartItems, setCartItems] = useState(() => getInitialState('cart', []));
  const [wishlistItems, setWishlistItems] = useState(() => getInitialState('wishlist', []));
  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log("Cart updated in localStorage:", cartItems);
    } catch (error) {
      console.error("Error setting cart in localStorage:", error);
    }
  }, [cartItems]);

  // Update localStorage whenever wishlistItems changes
  useEffect(() => {
    try {
      window.localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error setting wishlist in localStorage:", error);
    }
  }, [wishlistItems]);


  // --- CART FUNCTIONS ---
  const manageCartItem = useCallback((product, selectedSize, change) => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(
        item => item._id === product._id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        const newQuantity = existingItem.qty + change;
        if (newQuantity <= 0) {
          return prevCart.filter(item => !(item._id === product._id && item.selectedSize === selectedSize));
        }
        return prevCart.map(item =>
          item._id === product._id && item.selectedSize === selectedSize
            ? { ...item, qty: newQuantity }
            : item
        );
      }
      if (!existingItem && change > 0) {
        return [...prevCart, { ...product, qty: 1, selectedSize }];
      }
      return prevCart;
    });
  }, []);

  const addOrUpdateCartItem = useCallback((product, selectedSize) => {
     setCartItems(prevCart => {
        const existingItem = prevCart.find(
            item => item._id === product._id && item.selectedSize === selectedSize
        );
        if (!existingItem) {
            return [...prevCart, { ...product, qty: 1, selectedSize }];
        }
        return prevCart;
     });
  }, []);
  const toggleWishlistItem = useCallback((product) => {
    setWishlistItems(prevWishlist => {
      const isWishlisted = prevWishlist.some(item => item._id === product._id);
      
      if (isWishlisted) {
        return prevWishlist.filter(item => item._id !== product._id);
      } else {
        return [...prevWishlist, product];
      }
    });
  }, []);
  const contextValue = {
    products: initialProducts,
    isLoading: false,
    currency,
    delivery_fee,
    cart: cartItems,
    manageCartItem,
    addOrUpdateCartItem,
    wishlist: wishlistItems,
    toggleWishlistItem,
    clearCart
  };

  return (
    <showContext.Provider value={contextValue}>
      {children}
    </showContext.Provider>
  );
};

export default ShowProvider;