'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define the Particle interface at the module level
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  originalX: number;
  originalY: number;
}

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle mouse movement with debouncing to prevent rapid updates
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Clear any existing timeout
      clearTimeout(timeoutId);
      
      // Set a timeout to update the position after a delay
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      }, 50); // 50ms debounce
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setIsMounted(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Create constellation effect
  useEffect(() => {
    if (!canvasRef.current || !isMounted) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle properties - SIMPLIFIED
    const particleCount = 80;
    const connectionDistance = 150;
    const particleRadius = 2;
    const particles: Particle[] = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speed = 0.05 + Math.random() * 0.1; // Very slow base speed
      const angle = Math.random() * Math.PI * 2;
      
      // Create gradient colors for particles
      const hue = Math.floor(Math.random() * 60 + 160); // Blue-green range
      const color = `hsl(${hue}, 80%, 65%)`;
      
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 1 + particleRadius
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // EXTREMELY SIMPLIFIED MOUSE INTERACTION
        // Simply maintain base movement, only very subtle influence
        p.x += p.vx;
        p.y += p.vy;
        
        // Gentle wrap-around edges instead of bouncing
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections - unchanged as this part works well
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Line opacity based on distance
            const opacity = 1 - distance / connectionDistance;
            
            ctx.beginPath();
            ctx.strokeStyle = `${p.color.slice(0, -1)}, ${opacity})`;
            ctx.lineWidth = opacity * 1.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [isMounted]); // <-- REMOVED mousePosition dependency to prevent recalculation
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#0d1117] overflow-hidden">
      {/* Constellation background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      
      {/* Glowing overlay effect */}
      <div className="absolute inset-0 bg-radial-gradient z-10 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-9xl font-bold bg-gradient-to-r from-[#36d7b7] to-[#2ecc71] bg-clip-text text-transparent mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl font-semibold text-white mb-6"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            className="text-gray-400 text-lg mb-10"
          >
            Oops! It seems the page you're looking for has wandered off into another dimension. 
            Don't worry, our librarians are looking for it.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/"
              className="bg-gradient-to-r from-[#36d7b7] to-[#2ecc71] hover:from-[#2ecc71] hover:to-[#27ae60] text-white font-medium rounded-lg px-8 py-3 transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center"
            >
              <span>Return Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            
            <Link 
              href="/buy"
              className="border-2 border-[#36d7b7] text-[#36d7b7] hover:bg-[#36d7b7]/10 font-medium rounded-lg px-8 py-3 transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
            >
              <span>Explore Books</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}