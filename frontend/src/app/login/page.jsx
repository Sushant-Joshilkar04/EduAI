"use client";
import { login,signup} from "@/api/auth"; 
import React, {useState}  from 'react';
import { toast } from "sonner"

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try{
       const response = await login(formData);       
       const { token, user } = response.data ||  response;

         if (!user.isVerified) {
        toast("Please verify your email before logging in.");
        setIsLoading(false);
        return;
      }

       localStorage.setItem('token',token);
       localStorage.setItem('user', JSON.stringify(user));       toast("Login successful!");

       window.location.href = "/chat"; 
    }
    catch (err) {
      console.error('Error during login:', err );
       alert(err?.response?.data?.message || "Login failed");
    }
    finally {
      setIsLoading(false);
    }

    console.log('Login submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl relative">
          

          <div className="flex bg-white/10 rounded-lg p-1 mb-8 w-44 relative">
            <div className="absolute top-1 left-1 w-[calc(50%-2px)] h-[calc(100%-8px)] bg-white/90 rounded-md transition-transform duration-300"></div>
            <button className="flex-1 py-2 px-4 text-xs font-medium text-gray-900 relative z-10 transition-colors">
              Sign in
            </button>
            <button 
              className="flex-1 py-2 px-4 text-xs font-medium text-white/70 relative z-10 transition-colors hover:text-white"
              onClick={() => window.location.href = '/register'}
            >
              Sign up
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Welcome Back
          </h2>

          <div className="space-y-5">
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-white/90 text-gray-900 font-semibold rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
            >  {isLoading ? 'Signing In...' : 'Sign In'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}