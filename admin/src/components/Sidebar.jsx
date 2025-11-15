import React from 'react';

// You can create a reusable Icon component or just inline SVGs
const IconAllProducts = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const IconAddProduct = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconDashboard = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const Sidebar = () => {
  // In a real app, you'd get this from your router
  const currentPage = 'all-products';

  const baseLinkClasses =
    'flex items-center space-x-3 py-2.5 px-4 rounded-lg transition-colors duration-200';
  const inactiveLinkClasses = 'hover:bg-gray-700 text-gray-200';
  const activeLinkClasses = 'bg-gray-900 text-white font-medium';

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-5">
      {/* Sidebar Header */}
      <div className="text-2xl font-semibold text-center mb-8">
        Vastram
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className={`${baseLinkClasses} ${
                currentPage === 'dashboard'
                  ? activeLinkClasses
                  : inactiveLinkClasses
              }`}
            >
              <IconDashboard />
              <span>Dashboard</span>
            </a>
          </li>

          {/* Product CRUD Section */}
          <li className="pt-2">
            <span className="text-xs font-semibold text-gray-400 uppercase px-4">
              Products
            </span>
          </li>
          
          <li>
            <a
              href="#"
              className={`${baseLinkClasses} ${
                currentPage === 'all-products'
                  ? activeLinkClasses
                  : inactiveLinkClasses
              }`}
            >
              <IconAllProducts />
              <span>All Products</span>
            </a>
          </li>
          
          <li>
            <a
              href="#"
              className={`${baseLinkClasses} ${
                currentPage === 'add-product'
                  ? activeLinkClasses
                  : inactiveLinkClasses
              }`}
            >
              <IconAddProduct />
              <span>Add Product</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;