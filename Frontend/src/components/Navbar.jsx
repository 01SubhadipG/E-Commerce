import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCart, User, Search,Heart,Home, ShoppingBag, Info, Mail, Phone } from 'lucide-react';
import { showContext } from '../context/showContext';
import assets from '../assets/assets';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem('token') || localStorage.getItem('user'));
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const {wishlist=[],
    cart=[]
  }=useContext(showContext);
  // Keep login state in sync across tabs/windows
  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('token') || localStorage.getItem('user')));
    };
    window.addEventListener('storage', handleStorage);
    // also ensure current tab reads latest value on mount
    handleStorage();
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-indigo-600">
          <img src={assets.brand} alt="Logo" className=" w-20 h-8" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {[
            { href: '/', label: 'Home' },
            { href: '/Collections', label: 'Collections' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(link => {
            const isActive = window.location.pathname.toLowerCase() === link.href.toLowerCase();
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-gray-700 hover:text-indigo-600 transition relative ${isActive ? 'after:content-[""_] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="flex items-center px-3 py-2  text-gray-700 hover:bg-gray-100 transition focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <a href="/wishlist" className="text-gray-600 hover:text-indigo-600 transition relative">
            <Heart size={24} />
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlist.length}</span>
          </a>
          <a href="/cart" className="text-gray-600 hover:text-indigo-600 transition relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</span>
          </a>
          {!isLoggedIn ? (
            <a href="/login" className="flex items-center px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">
              <User className="mr-2 w-5 h-5" /> Login
            </a>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu((p) => !p)}
                className="flex items-center px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition focus:outline-none"
                aria-haspopup="true"
                aria-expanded={showProfileMenu}
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-40">
                  <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</a>
                  <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</a>
                  <button
                    onClick={() => {
                      // simple logout: remove token/user and update state
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      setIsLoggedIn(false);
                      setShowProfileMenu(false);
                      // optionally navigate to homepage
                      window.location.href = '/';
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="flex items-center px-3 py-2  text-gray-700 hover:bg-gray-100 transition focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          {[
            { href: '/', label: 'Home', icon: <Home className="mr-2 w-5 h-5" /> },
            { href: '/products', label: 'Collections', icon: <ShoppingBag className="mr-2 w-5 h-5" /> },
            { href: '/about', label: 'About', icon: <Info className="mr-2 w-5 h-5" /> },
            { href: '/contact', label: 'Contact', icon: <Phone className="mr-2 w-5 h-5" /> },
            { href: '/login', label: 'Login', icon: <User className="mr-2 w-5 h-5" /> },
            { href: '/wishlist', label: 'Wishlist', icon: <Heart className="mr-2 w-5 h-5" /> },
            { href: '/cart', label: 'Cart', icon: <ShoppingCart className="mr-2 w-5 h-5" /> },
          ].filter(link => !(isLoggedIn && link.href === '/login')).map(link => {
            const isActive = window.location.pathname.toLowerCase() === link.href.toLowerCase();
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center py-2 hover:text-indigo-700 transition mt-2 relative ${isActive ? 'after:content-[""_] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full' : ''}`}
              >
                {link.icon}{link.label}
              </a>
            );
          })}
        </div>
      )}
      {/* Search input below navbar */}
      {showSearch && (
        <div className="w-full flex justify-center bg-white border-t py-4">
          <input
            type="text"
            autoFocus
            placeholder="Search products..."
            className="w-11/12 md:w-1/2 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
