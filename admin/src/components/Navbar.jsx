import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbar = () => {
  // The active state is now handled by NavLink, so we don't need useState here.

  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = 'flex items-center w-full px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200';
    if (isActive) {
      return `${baseClasses} bg-pink-100 text-pink-600 border-r-4 border-pink-500`;
    }
    return `${baseClasses} hover:bg-gray-100 hover:text-gray-800`;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm flex justify-end items-center px-6 py-4">
          <button className="bg-gray-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-200">
            Logout
          </button>
        </header>

        {/* Page Content Rendered by the Router */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default Navbar;