"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/home/HeroSection";
import FeaturedCategories from "./components/home/FeaturedCategories";
import BenefitsSection from "./components/home/BenefitsSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import CtaSection from "./components/home/CtaSection";

export default function Home() {
  // Scroll progress for animations
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section with 3D Polygon Background */}
        <HeroSection scrollProgress={scrollProgress} />
        
        {/* Featured Categories */}
        <FeaturedCategories />
        
        {/* Benefits Section */}
        <BenefitsSection />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CtaSection />
        
        {/* Footer spacer - provides space to scroll to trigger footer visibility */}
        <div className="h-screen md:h-[50vh] pointer-events-none"></div>
      </main>
      
      <Footer />
    </div>
  );
}
