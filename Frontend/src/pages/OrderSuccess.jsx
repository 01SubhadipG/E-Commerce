import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
            <CheckCircle className="text-green-500 w-24 h-24 mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Thank You!</h1>
            <p className="text-lg text-gray-600 mb-8">Your order has been placed successfully.</p>
            <div className="flex items-center gap-4">
                <Link 
                    to="/" 
                    className="px-6 py-3 bg-gray-800 text-white rounded-md font-semibold hover:bg-black transition"
                >
                    Go to Homepage
                </Link>
                <Link 
                    to="/collections" 
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;