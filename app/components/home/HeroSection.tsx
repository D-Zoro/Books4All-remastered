"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { init } from '../../utils/polygonBackground';

interface HeroSectionProps {
  scrollProgress: number;
}

const HeroSection = ({ scrollProgress }: HeroSectionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize the polygon background with performance optimizations
  useEffect(() => {
    if (!canvasRef.current) return;

    // Check device performance to adjust quality
    const isLowPerfDevice = window.navigator.hardwareConcurrency <= 4;
    
    try {
      // Initialize with perf options
      const cleanup = init(canvasRef.current, {
        particleCount: isLowPerfDevice ? 50 : 100,
        connectionRadius: isLowPerfDevice ? 80 : 120,
        animationSpeed: isLowPerfDevice ? 0.5 : 1
      });
      
      setIsLoaded(true);
      
      // Clean up animation on unmount
      return () => {
        if (cleanup && typeof cleanup === 'function') {
          cleanup();
        }
      };
    } catch (error) {
      console.error("Failed to initialize background:", error);
      // Fallback: Still mark as loaded even if background fails
      setIsLoaded(true);
    }
  }, []);

  // Handle background opacity via CSS variable instead of inline style
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--hero-bg-opacity', 
      Math.max(0.5, 1 - scrollProgress * 2).toString()
    );
  }, [scrollProgress]);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Performance-optimized polygon background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 hero-canvas" 
        // CSS variable-based opacity for better performance
        style={{ opacity: 'var(--hero-bg-opacity, 1)' }} 
      />
      
      {/* Content with optimized animations */}
      <div className="container mx-auto px-4 z-10 relative pt-16">
        <motion.div 
          className="flex flex-col-reverse lg:flex-row items-center justify-between"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36d7b7] to-[#2ecc71]">Books</span> That
              <br /> Shape Your World
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Buy and sell textbooks, fiction, and more. Connect with fellow readers and
              get personalized recommendations with our AI assistant.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Link 
                href="/buy" 
                className="bg-gradient-to-r from-[#36d7b7] to-[#2ecc71] hover:from-[#2ecc71] hover:to-[#27ae60] text-white font-medium rounded-lg px-8 py-3 transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center"
              >
                <span>Explore Books</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href="/sell" 
                className="border-2 border-[#36d7b7] text-[#36d7b7] hover:bg-[#36d7b7]/10 font-medium rounded-lg px-8 py-3 transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                Sell Your Books
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="lg:w-1/2 w-full flex justify-center mb-8 lg:mb-0"
            variants={itemVariants}
          >
            <div className="relative h-64 sm:h-80 md:h-96 w-full max-w-md mx-auto">
              <Image
                src="/images/books-hero.jpg" // Move to local image for better optimization
                alt="Stack of books"
                fill
                className="object-cover rounded-xl shadow-2xl will-change-transform transform rotate-3 hover:rotate-0 transition-transform duration-500"
                sizes="(max-width: 768px) 90vw, 50vw"
                priority
                quality={85}
                onError={(e) => console.error('Image failed to load', e)}
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <p className="text-gray-800 font-medium text-sm">1000+ Books</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
       
      </div>
    </section>
  );
};

export default HeroSection;
