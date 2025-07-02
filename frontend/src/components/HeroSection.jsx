'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-700 overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 sm:left-8 md:left-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-4 sm:right-8 md:right-32 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-blue-400/10 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px] sm:[background-size:40px_40px] md:[background-size:50px_50px] opacity-20"></div>
        
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <path 
            d="M0,400 Q300,200 600,400 T1200,400" 
            stroke="url(#gradient1)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M0,300 Q400,100 800,300 T1200,300" 
            stroke="url(#gradient2)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse delay-500"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
              <stop offset="100%" stopColor="rgba(147,51,234,0.5)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Interactive Floating Cards - Mobile hidden, tablet and desktop positioned */}
      <div className="hidden md:block absolute top-32 left-8 lg:left-16 transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 animate-float cursor-pointer group">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 lg:p-4 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-3 h-3 lg:w-4 lg:h-4 bg-white rounded-sm group-hover:rotate-12 transition-transform duration-300"></div>
            </div>
            <div>
              <p className="text-white font-medium text-sm lg:text-base group-hover:text-blue-200 transition-colors duration-300">StudyAI</p>
              <p className="text-gray-400 text-xs lg:text-sm group-hover:text-gray-300 transition-colors duration-300">24,945 students</p>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-35 right-12 xl:right-20 transform rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 animate-float-delay cursor-pointer group">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-4 h-4 bg-white rounded-full group-hover:animate-pulse"></div>
            </div>
            <div>
              <p className="text-white font-medium group-hover:text-green-200 transition-colors duration-300">Smart Notes</p>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">1,042 notes</p>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75 animation-delay-500"></div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-32 lg:bottom-40 left-6 lg:left-12 transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 animate-float-reverse cursor-pointer group">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 lg:p-4 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-3 h-3 lg:w-4 lg:h-4 bg-white rounded-full group-hover:animate-spin"></div>
            </div>
            <div>
              <p className="text-white font-medium text-sm lg:text-base group-hover:text-purple-200 transition-colors duration-300">AI Tutor</p>
              <p className="text-gray-400 text-xs lg:text-sm group-hover:text-gray-300 transition-colors duration-300">19,346 sessions</p>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-1000"></div>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-32 right-8 xl:right-16 transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 animate-float-delay-2 cursor-pointer group">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
            </div>
            <div>
              <p className="text-white font-medium group-hover:text-orange-200 transition-colors duration-300">Study Planner</p>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">440 plans</p>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-75 animation-delay-1500"></div>
        </div>
      </div>

      {/* Central Glow Effect - Responsive sizing */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Notification - Responsive sizing */}
        <div className="mb-6 sm:mb-8 inline-flex items-center px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs sm:text-sm hover:bg-white/20 transition-colors duration-300 cursor-pointer">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
          <span className="hidden sm:inline">🚀 Transform Your Learning Experience</span>
          <span className="sm:hidden">🚀 Transform Learning</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Main Heading - Responsive typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
          One-click for AI-Powered
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Learning
          </span>
        </h1>

        {/* Subtitle - Responsive typography and spacing */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl leading-relaxed px-4 sm:px-0">
          Dive into intelligent study materials, where innovative AI technology meets 
          personalized learning experience
        </p>

        {/* CTA Button - Fully Responsive */}
        <div className="flex justify-center items-center mb-8 sm:mb-12 lg:mb-16 w-full px-4 sm:px-6 md:px-8">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
              const token = localStorage.getItem("token");
              if (token) {
               router.push("/chat");
              } else {
              router.push("/register");
              }
             }
             }}
            className="
              w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:w-auto
              px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14
              py-3 sm:py-3.5 md:py-4 lg:py-4.5 xl:py-5
              bg-gradient-to-r from-blue-500 to-purple-600 
              text-white font-medium sm:font-semibold 
              rounded-full 
              hover:from-blue-600 hover:to-purple-700 
              transition-all duration-300 
              transform hover:scale-105 active:scale-95 
              shadow-lg hover:shadow-xl hover:shadow-purple-500/25
              text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl
              min-h-[44px] sm:min-h-[48px] md:min-h-[52px] lg:min-h-[56px] xl:min-h-[60px]
              flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Get Started Free
          </button>
        </div>

        {/* Mobile Feature Cards - Only visible on mobile */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
              <p className="text-white font-medium text-sm">StudyAI</p>
            </div>
            <p className="text-gray-400 text-xs">24K+ students</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
              <p className="text-white font-medium text-sm">Smart Notes</p>
            </div>
            <p className="text-gray-400 text-xs">1K+ notes</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
              <p className="text-white font-medium text-sm">AI Tutor</p>
            </div>
            <p className="text-gray-400 text-xs">19K+ sessions</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
              <p className="text-white font-medium text-sm">Study Planner</p>
            </div>
            <p className="text-gray-400 text-xs">440 plans</p>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 items-center text-white/60 hover:text-white transition-colors cursor-pointer">
          <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 lg:h-3 bg-white/60 rounded-full mt-1 lg:mt-2 animate-bounce"></div>
          </div>
          <span className="ml-2 lg:ml-3 text-xs lg:text-sm">Scroll down</span>
        </div>
      </div>

      {/* Bottom Right Feature Highlight - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-16 sm:bottom-20 right-4 sm:right-8 text-right">
        <div className="text-white/80">
          <p className="text-xs sm:text-sm font-medium">AI Learning horizons</p>
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-blue-400 to-purple-500 mt-2 ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;