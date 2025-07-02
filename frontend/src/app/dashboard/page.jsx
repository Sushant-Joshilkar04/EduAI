"use client";
import NavbarDemo from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StickyScroll from '@/components/Sticky_Scroll';
import { AnimatedTestimonialsDemo } from '@/components/AnimatedTestimonials ';
import { Footer7 } from '@/components/footer';
export default function HomePage() {
  return (
    <div>
      <NavbarDemo />
      <HeroSection/>
      <div className='bg-gray-900 dark:bg-neutral-900'><br /></div>
      <StickyScroll/>
      <div className="bg-gray-900 dark:bg-neutral-900"><AnimatedTestimonialsDemo/></div>
      <div className='bg-gray-900 dark:bg-neutral-900'><br /></div>
      <Footer7/>
    </div>
  );
}