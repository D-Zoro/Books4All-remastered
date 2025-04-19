"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { init } from '../../utils/polygonBackground';

interface HeroSectionProps {
  scrollProgress: number;
}

const HeroSection = ({ scrollProgress }: HeroSectionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize the 3D polygon background
  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = init(canvasRef.current);
      return cleanup;
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center">
      {/* 3D Polygon Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0" 
        style={{ opacity: Math.max(0.5, 1 - scrollProgress * 2) }} 
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative pt-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36d7b7] to-[#2ecc71]">Books</span> That
              <br /> Shape Your World
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
              Buy and sell textbooks, fiction, and more. Connect with fellow readers and
              get personalized recommendations with our AI assistant.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/buy" className="bg-gradient-to-r from-[#36d7b7] to-[#2ecc71] hover:from-[#2ecc71] hover:to-[#27ae60] text-white font-medium rounded-lg px-8 py-3 transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center">
                <span>Explore Books</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/sell" className="border-2 border-[#36d7b7] text-[#36d7b7] hover:bg-[#36d7b7]/10 font-medium rounded-lg px-8 py-3 transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                Sell Your Books
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-64 sm:h-80 md:h-96 w-full max-w-md">
              <Image
                src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Stack of books"
                fill
                className="object-cover rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                priority
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <p className="text-gray-800 font-medium text-sm">1000+ Books</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </div>
          <p className="text-white/60 text-xs mt-2 text-center">Scroll Down</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
