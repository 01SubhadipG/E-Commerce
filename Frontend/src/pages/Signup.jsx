import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log('Signup successful:', { name, email, password });
    
    // Simulate successful signup and login
    localStorage.setItem('token', 'fake-jwt-for-demo');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="p-8 rounded-lg bg-white shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Create an Account</h1>
          <p className="text-gray-500 mt-2">Join us and start shopping!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" required />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com" required />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 pr-12 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-800 pt-8" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 pr-12 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" required />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-800 pt-8" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-800 font-semibold" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </Link>
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-150 transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold transition">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;