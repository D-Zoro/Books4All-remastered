"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaArrowRight, 
  FaBookOpen, 
  FaEnvelope 
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  // Handle scroll to detect when we're at the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're near the bottom (within 150px)
      const nearBottom = scrollPosition + windowHeight >= documentHeight - 150;
      
      if (nearBottom && !isVisible) {
        setIsVisible(true);
        controls.start({ 
          y: 0,
          opacity: 1,
          transition: { duration: 0.7, ease: "easeOut" }
        });
      } else if (!nearBottom && isVisible) {
        setIsVisible(false);
        controls.start({ 
          y: "100%",
          opacity: 0,
          transition: { duration: 0.3, ease: "easeIn" }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, controls]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();
  
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-40"
      initial={{ y: "100%", opacity: 0 }}
      animate={controls}
    >
      {/* Wave SVG Divider */}
      <div className="w-full bg-gradient-to-b from-[#1a2a3a] to-[#0f172a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <svg
            className="w-full"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M0 50L48 45.7C96 41.3 192 32.7 288 35.5C384 38.3 480 52.7 576 57.8C672 63 768 59 864 51.2C960 43.3 1056 31.7 1152 28.3C1248 25 1344 30 1392 32.5L1440 35V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
              fill="url(#footer-gradient)"
              stroke="#36d7b7"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#36d7b7" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#2ecc71" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#27ae60" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-300 pt-10 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Link href="/" className="flex items-center gap-3">
                <motion.div 
                  className="bg-gradient-to-br from-[#36d7b7] to-[#2ecc71] p-2.5 rounded-lg"
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaBookOpen className="text-white text-xl" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white">
                  Books<span className="text-[#36d7b7]">4</span>All
                </h1>
              </Link>
              <p className="mt-5 text-gray-400 pr-6">
                Discover, buy, and sell books with our innovative platform. 
                Join our growing community of book lovers today.
              </p>
              
              {/* Social Media */}
              <div className="flex mt-6 space-x-4">
                {[
                  { icon: <FaFacebookF />, href: "https://facebook.com" },
                  { icon: <FaTwitter />, href: "https://twitter.com" },
                  { icon: <FaInstagram />, href: "https://instagram.com" },
                  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a2a3a] text-gray-400 hover:text-white p-2.5 rounded-full"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "#36d7b7", 
                      color: "#ffffff" 
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 md:mt-0"
            >
              <h3 className="text-lg font-semibold mb-5 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Buy Books", path: "/buy" },
                  { name: "Sell Books", path: "/sell" },
                  { name: "AI Support", path: "/ai-support" },
                  { name: "About Us", path: "/about" },
                ].map((link, index) => (
                  <motion.li key={index} className="group">
                    <Link 
                      href={link.path}
                      className="inline-block text-gray-400 hover:text-[#36d7b7] transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: 20 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="h-[1px] bg-[#36d7b7] mr-2"
                        />
                        {link.name}
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 md:mt-0"
            >
              <h3 className="text-lg font-semibold mb-5 text-white">Contact Us</h3>
              <ul className="space-y-4">
                <motion.li 
                  className="flex items-start space-x-3"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mt-1 bg-[#1a2a3a] p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#36d7b7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    123 Book Street
                    <br />
                    Reading, CA 90210
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start space-x-3"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mt-1 bg-[#1a2a3a] p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#36d7b7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    +1 (555) 123-4567
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start space-x-3"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mt-1 bg-[#1a2a3a] p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#36d7b7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    info@books4all.com
                  </div>
                </motion.li>
              </ul>
            </motion.div>
            
            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 md:mt-0"
            >
              <h3 className="text-lg font-semibold mb-5 text-white">Join Our Newsletter</h3>
              <p className="text-gray-400 mb-5">
                Stay updated with our latest news and book releases.
              </p>
              
              <form onSubmit={handleSubscribe}>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-[#1a2a3a] text-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#36d7b7] transition-all duration-300"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-4 text-[#36d7b7]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowRight />
                  </motion.button>
                </div>
                
                {/* Success Message */}
                <AnimatedSuccessMessage show={subscribed} />
              </form>
            </motion.div>
          </div>
          
          {/* Divider */}
          <motion.div 
            className="border-t border-gray-700/50 my-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              &copy; {currentYear} Books4All. All rights reserved.
            </motion.p>
            
            <motion.div
              className="flex space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#36d7b7]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-[#36d7b7]">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-sm text-gray-500 hover:text-[#36d7b7]">
                FAQ
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Animated success message component
const AnimatedSuccessMessage = ({ show }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={show ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
      className="mt-3 overflow-hidden"
    >
      <div className="bg-[#36d7b7]/20 text-[#36d7b7] rounded-md py-2 px-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Thank you for subscribing!</span>
      </div>
    </motion.div>
  );
};

export default Footer;
