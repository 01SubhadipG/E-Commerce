import React, { useContext, useMemo, useState, useEffect } from 'react';
import { showContext } from '../context/showContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const PlaceOrder = () => {
  const { 
    cart = [], 
    currency, 
    delivery_fee = 0,
    clearCart
  } = useContext(showContext);
  
  const navigate = useNavigate();

  // State for form inputs, now including payment details
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zip: '', country: '', phone: '',
    cardName: '', cardNumber: '', expiryDate: '', cvc: ''
  });

  // State for the selected payment method
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // Redirect if the cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Calculate totals
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  }, [cart]);

  const total = subtotal + delivery_fee;
  
  // Handle form submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log("Order placed with data:", {
      orderItems: cart,
      deliveryDetails: formData,
      paymentMethod: paymentMethod,
      totalAmount: total.toFixed(2)
    });
    
    alert("Thank you for your order! Your items are on their way.");
    clearCart();
    navigate('/');
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Information Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} value={formData.firstName} required className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} value={formData.lastName} required className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} value={formData.email} required className="sm:col-span-2 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="street" placeholder="Street Address" onChange={handleInputChange} value={formData.street} required className="sm:col-span-2 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="city" placeholder="City" onChange={handleInputChange} value={formData.city} required className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="state" placeholder="State / Province" onChange={handleInputChange} value={formData.state} required className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="zip" placeholder="Zip / Postal Code" onChange={handleInputChange} value={formData.zip} required className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="country" placeholder="Country" onChange={handleInputChange} value={formData.country} required className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} value={formData.phone} required className="sm:col-span-2 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            {/* --- NEW: Payment Method Section --- */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500">
                  <input type="radio" name="payment" value="credit-card" checked={paymentMethod === 'credit-card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-4 font-semibold">Credit Card</span>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500">
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-4 font-semibold">PayPal</span>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-4 font-semibold">Cash on Delivery</span>
                </label>
              </div>

              {/* --- NEW: Conditional Payment Details Form --- */}
              {paymentMethod === 'credit-card' && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <input type="text" name="cardName" placeholder="Name on Card" onChange={handleInputChange} value={formData.cardName} required className="sm:col-span-4 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleInputChange} value={formData.cardNumber} required className="sm:col-span-4 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" name="expiryDate" placeholder="MM / YY" onChange={handleInputChange} value={formData.expiryDate} required className="sm:col-span-2 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input type="text" name="cvc" placeholder="CVC" onChange={handleInputChange} value={formData.cvc} required className="sm:col-span-2 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Your Order</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4 border-b pb-4">
                {cart.map(item => (
                  <div key={`${item._id}-${item.selectedSize}`} className="flex justify-between items-center text-sm">
                    <p className="text-gray-600">{item.name} <span className="text-gray-500">x{item.qty}</span></p>
                    <p className="font-semibold">{currency}{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>
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
              <button type="submit" className="w-full mt-6 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-black transition disabled:opacity-50 flex items-center justify-center gap-2" disabled={cart.length === 0}>
                <Lock size={16} /> Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PlaceOrder;