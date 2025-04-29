'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';

// Define the Particle interface for the background
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Handle send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Validate password
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // Confirm passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send OTP');
      }
      
      setOtpSent(true);
      setSuccess('OTP sent to your email. Please verify to complete registration.');
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
      setIsLoading(false);
    }
  };
  
  // Handle OTP verification and registration
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password })
      });
      
      if (!response.ok) {
        const data = await response.text();
        throw new Error(data || 'Failed to register');
      }
      
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
      setIsLoading(false);
    }
  };
  
  // Handle resend OTP
  const handleResendOTP = async () => {
    setError('');
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to resend OTP');
      }
      
      setSuccess('OTP resent to your email');
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
      setIsLoading(false);
    }
  };
  
  // Handle Google sign in
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  // Create constellation background effect
  useEffect(() => {
    if (!canvasRef.current) return;
    setIsMounted(true);
    
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
    
    // Particle properties
    const particleCount = 80;
    const connectionDistance = 150;
    const particles: Particle[] = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speed = 0.05 + Math.random() * 0.1;
      const angle = Math.random() * Math.PI * 2;
      
      // Create gradient colors for particles
      const hue = Math.floor(Math.random() * 60 + 160); // Blue-green range
      const color = `hsl(${hue}, 80%, 65%)`;
      
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 1.5 + 1
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.vx;
        p.y += p.vy;
        
        // Gentle wrap-around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
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
  }, []);

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
    <div className="relative min-h-screen w-full bg-[#0d1117] overflow-hidden">
      {/* Constellation background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      
      {/* Glowing overlay effect */}
      <div className="absolute inset-0 bg-radial-gradient z-10 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-md w-full"
        >
          <motion.div 
            variants={itemVariants} 
            className="bg-[#1a2a3a]/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-[#36d7b7]/20"
          >
            <div className="text-center mb-8">
              <motion.h1 
                variants={itemVariants}
                className="text-3xl font-bold text-white mb-2" 
              >
                Create Account
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-gray-400" 
              >
                Join Books<span className="text-[#36d7b7]">4</span>All today
              </motion.p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-6"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded mb-6"
              >
                {success}
              </motion.div>
            )}

            {!otpSent ? (
              <motion.form 
                variants={itemVariants} 
                onSubmit={handleSendOTP}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#243447]/50 border border-gray-600/30 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#36d7b7] focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#243447]/50 border border-gray-600/30 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#36d7b7] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#243447]/50 border border-gray-600/30 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#36d7b7] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-[#36d7b7] to-[#2ecc71] hover:from-[#2ecc71] hover:to-[#27ae60] text-white font-medium rounded-lg px-5 py-3 text-center transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  Send OTP
                </motion.button>
              </motion.form>
            ) : (
              <motion.form 
                variants={itemVariants} 
                onSubmit={handleVerifyOTP}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-1">
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-[#243447]/50 border border-gray-600/30 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#36d7b7] focus:border-transparent transition-all tracking-wider text-center font-mono text-xl"
                    placeholder="******"
                    maxLength={6}
                    required
                  />
                  <p className="mt-2 text-sm text-gray-400 flex justify-between items-center">
                    <span>Didn't receive the code?</span>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-[#36d7b7] hover:text-[#2ecc71] hover:underline transition-colors"
                      disabled={isLoading}
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>

                <motion.button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-[#36d7b7] to-[#2ecc71] hover:from-[#2ecc71] hover:to-[#27ae60] text-white font-medium rounded-lg px-5 py-3 text-center transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  Verify & Register
                </motion.button>
              </motion.form>
            )}

            <motion.div 
              variants={itemVariants}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a2a3a] text-gray-400">Or continue with</span>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-100 font-medium rounded-lg px-5 py-3 transition-all transform hover:-translate-y-1 hover:shadow-lg"
              onClick={handleGoogleSignIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGoogle className="text-red-500" />
              Sign up with Google
            </motion.button>

            <motion.div 
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link 
                  href="/auth/login" 
                  className="text-[#36d7b7] hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <Link 
              href="/"
              className="text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
