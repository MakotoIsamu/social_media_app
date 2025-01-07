import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {BACKEND_URI} from '../utils'
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        return toast.error(data.error);
      }

      const data = await response.json();
      toast.success(data.message);
      navigate('/');
    } catch (error) {
      toast.error('Network error! Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Log in to your account</p>
        </div>

        {/* Card Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl ring-1 ring-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-400 hover:text-blue-300 transition duration-200"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 mt-8"
            >
              Log In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;