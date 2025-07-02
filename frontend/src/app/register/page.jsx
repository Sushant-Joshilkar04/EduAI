"use client";
import React, { useState } from 'react';
import { signup } from '@/api/auth';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordMatch, setPasswordMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'confirmPassword' || name === 'password') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      if (confirmPassword === '') {
        setPasswordMatch(null);
      } else if (password === confirmPassword) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username, 
        password: formData.password
      });

      alert("Registration successful! Please check your email for verification.");
      console.log('Registration submitted:', response);

      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
      });

      window.location.href = "/login";
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl relative">
          

          <div className="flex bg-white/10 rounded-lg p-1 mb-8 w-44 relative">
            <div className="absolute top-1 right-1 w-[calc(50%-2px)] h-[calc(100%-8px)] bg-white/90 rounded-md transition-transform duration-300"></div>
            <button 
              className="flex-1 py-2 px-4 text-xs font-medium text-white/70 relative z-10 transition-colors hover:text-white"
              onClick={() => window.location.href = '/login'}
            >
              Sign in
            </button>
            <button className="flex-1 py-2 px-4 text-xs font-medium text-gray-900 relative z-10 transition-colors">
              Sign up
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Create an account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                name="username"
                placeholder="Enter your email"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                required
              />
              {passwordMatch === false && (
                <p className="text-red-400 text-xs mt-2">Passwords do not match</p>
              )}
              {passwordMatch === true && (
                <p className="text-green-400 text-xs mt-2">Passwords match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-white/90 text-gray-900 font-semibold rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create an account'}
            </button>
          </form>

          <div className="text-center text-xs text-white/50 mt-5">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-white/70 hover:text-white">
              Terms & Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}