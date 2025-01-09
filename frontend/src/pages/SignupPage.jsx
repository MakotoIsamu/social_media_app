import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {BACKEND_URI} from '../utils'

const SignupPage = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        return toast.error(data.error);
      }

      const data = await response.json();
      toast.success(data.message);
      navigate('/login');
    } catch (error) {
      toast.error('Network error! Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join our community today</p>
        </div>

        {/* Card Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl ring-1 ring-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your full name"
              />
            </div>

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
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Create a password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 mt-8"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;