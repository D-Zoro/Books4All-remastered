"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaArrowRight, 
  FaBookOpen
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  const waveVariants = {
    initial: { pathLength: 0, pathOffset: 1 },
    animate: { 
      pathLength: 1, 
      pathOffset: 0,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };
  
  return (
    <footer className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-300 pt-6 sm:pt-10 pb-6 overflow-hidden">
      
      
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-3">
              <motion.div 
                className="bg-gradient-to-br from-[#36d7b7] to-[#2ecc71] p-2.5 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FaBookOpen className="text-white text-xl" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white">
                Books<motion.span 
                  className="text-[#36d7b7]"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                >4</motion.span>All
              </h1>
            </Link>
            <p className="mt-4 text-gray-400 pr-0 sm:pr-6">
              Discover, buy, and sell books with our innovative platform. 
              Join our growing community of book lovers today.
            </p>
            
            {/* Social Media with hover animations */}
            <div className="flex mt-5 space-x-4">
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
                  className="bg-[#1a2a3a] text-gray-400 hover:text-white p-2.5 rounded-full transition-colors duration-200 hover:bg-[#36d7b7]"
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div className="mt-2 sm:mt-0" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Buy Books", path: "/buy" },
                { name: "Sell Books", path: "/sell" },
                { name: "AI Support", path: "/ai-support" },
                { name: "About Us", path: "/about" },
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.path}
                    className="text-gray-400 hover:text-[#36d7b7] transition-colors duration-200 flex items-center group"
                  >
                    <motion.span 
                      className="w-2 h-0.5 bg-[#36d7b7] mr-2 opacity-0 group-hover:opacity-100"
                      initial={{ width: 0 }}
                      whileHover={{ width: "0.5rem" }}
                      transition={{ duration: 0.2 }}
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div className="mt-2 sm:mt-0" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#36d7b7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  content: <>123 Book Street<br />Reading, CA 90210</>
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#36d7b7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  content: <>+1 (555) 123-4567</>
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#36d7b7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  content: <>info@books4all.com</>
                }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className="mt-1 bg-[#1a2a3a] p-2 rounded-md"
                    whileHover={{ backgroundColor: "rgba(54, 215, 183, 0.2)" }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="text-gray-400">
                    {item.content}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter with animated success message */}
          <motion.div className="mt-2 sm:mt-0" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest news and book releases.
            </p>
            
            <form onSubmit={handleSubscribe} className="mb-2">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-[#1a2a3a] text-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#36d7b7]"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-[#36d7b7] hover:text-white transition-colors duration-200"
                  aria-label="Subscribe"
                  whileHover={{ scale: 1.2, x: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaArrowRight />
                </motion.button>
              </motion.div>
              
              {/* Animated Success Message */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={subscribed ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 bg-[#36d7b7]/20 text-[#36d7b7] rounded-md py-2 px-3 flex items-center">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={subscribed ? { scale: 1, rotate: [0, 15, -15, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span>Thank you for subscribing!</span>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </div>
        
        {/* Divider with animation */}
        <motion.div 
          className="border-t border-gray-700/50 my-6"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
        
        {/* Bottom Section with staggered animations */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm text-gray-500 mb-4 sm:mb-0"
            variants={itemVariants}
          >
            &copy; {currentYear} Books4All. All rights reserved.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            variants={itemVariants}
          >
            {["Privacy Policy", "Terms of Service", "FAQ"].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link 
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} 
                  className="text-sm text-gray-500 hover:text-[#36d7b7] transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
