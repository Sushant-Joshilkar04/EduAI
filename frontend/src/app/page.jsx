"use client";
import NavbarDemo from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StickyScroll from '@/components/Sticky_Scroll';
import { AnimatedTestimonialsDemo } from '@/components/AnimatedTestimonials ';
import { Footer7 } from '@/components/footer';
import dynamic from 'next/dynamic';
export default function HomePage() {
  return (
    <div>
      <NavbarDemo />
      <HeroSection/>
      <div className='bg-gray-900 dark:bg-neutral-900'><br /></div>
      
      {/* Our Features Section */}
      <div id="features" className="bg-gray-900 dark:bg-neutral-900 py-16">
        <div className="relative">
          <h2 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-tight">
            Our Features
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-center text-gray-400 mt-6 text-lg font-light max-w-2xl mx-auto">
            Discover the powerful capabilities that set us apart
          </p>
        </div>
      </div>
      <StickyScroll/>
      
      {/* Our Testimonials Section */}
      <div className="bg-gray-900 dark:bg-neutral-900 py-16">
        <div className="relative">
          <h2 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tight">
            Our Testimonials
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full"></div>
          </div>
          <p className="text-center text-gray-400 mt-6 text-lg font-light max-w-2xl mx-auto">
            Hear what our amazing clients have to say about their experience
          </p>
        </div>
        <AnimatedTestimonialsDemo/>
      </div>
      
      <div className='bg-gray-900 dark:bg-neutral-900'><br /></div>
      <div id="footer">
        <Footer7/>
      </div>
    </div>
  );
}