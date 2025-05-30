"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import PropTypes from "prop-types";
import { useSession, signIn, signOut } from "next-auth/react";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

// Navigation links configuration - defined once and reused
const NAV_LINKS = [
  { path: "/buy", label: "Buy" },
  { path: "/sell", label: "Sell" },
  { path: "/ai-support", label: "AI Support" },
  { path: "/about", label: "About" }
];

// Style constants
const STYLES = {
  scrolled: "py-2 bg-gradient-to-r from-[#1a2a3a] to-[#2c3e50] shadow-lg",
  notScrolled: "py-3 bg-gradient-to-b from-[#243447] to-[#1d2b3a] shadow-md",
  highlight: "text-[#36d7b7]"
};

const Navbar = () => {
  const { data: session } = useSession(); // Moved inside component
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Optimized scroll listener with true debounce
  useEffect(() => {
    let debounceTimer;
    
    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setScrolled(window.scrollY > 30);
      }, 100);
    };

    // Initial check when component mounts
    setScrolled(window.scrollY > 30);
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(e.target) && 
        toggleButtonRef.current && 
        !toggleButtonRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    
    // Add listeners for mouse and keyboard accessibility
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    });
    
    // Prevent background scrolling when menu is open
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      });
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback((e) => {
    e.stopPropagation();
    setMobileMenuOpen((prev) => !prev);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className={`fixed top-0 w-full z-50 ${montserrat.className}`}>
      <nav
        className={`transition-all duration-300 ease-in-out ${
          scrolled ? STYLES.scrolled : STYLES.notScrolled
        }`}
      >
        <div className="w-full px-3 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center pl-0 md:pl-2">
            <Link href="/" aria-label="Books4All Home" className="flex items-center gap-2">
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image
                  src="/favicon.ico"
                  alt="Books4All"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 32px, 40px"
                  priority
                />
              </div>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Books<span className={STYLES.highlight}>4</span>All
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {NAV_LINKS.map(({ path, label }) => (
              <NavLink key={path} href={path} isActive={pathname === path}>
                {label}
              </NavLink>
            ))}
            
            {/* Login/Logout Link (Desktop) */}
            {!session ? (
              <Link
                href="/auth/login"
                className="text-white font-semibold text-lg hover:text-[#36d7b7] transition-all duration-300 flex items-center gap-1.5 group ml-2"
              >
                <span>Login</span>
                <LoginIcon/>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                {/* {session.user?.image && (
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[#36d7b7]">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )} */}
                <Link
                  href="#"
                  onClick={() => signOut()}
                  className="text-white font-semibold text-lg hover:text-[#36d7b7] transition-all duration-300 flex items-center gap-1.5 group"
                >
                  <span>Sign Out</span>
                  <LogoutIcon />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              ref={toggleButtonRef}
              onClick={toggleMobileMenu}
              className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#36d7b7] rounded-md"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <HamburgerIcon isOpen={mobileMenuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - FIXED */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-x-0 top-[${scrolled ? '56px' : '64px'}] bg-[#1d2b3a] shadow-lg transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          style={{ 
            maxHeight: mobileMenuOpen ? 'calc(100vh - 64px)' : '0',
            overflow: mobileMenuOpen ? 'auto' : 'hidden'
          }}
        >
          <div className="flex flex-col space-y-4 px-5 py-6 divide-y divide-gray-600/30">
            {/* Navigation links */}
            <div className="space-y-4 pb-4">
              {NAV_LINKS.map(({ path, label }) => (
                <MobileNavLink
                  key={path}
                  href={path}
                  isActive={pathname === path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </MobileNavLink>
              ))}
            </div>

            {/* Login/User section - FIXED */}
            <div className="pt-4">
              {!session ? (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-white font-semibold text-xl py-3 hover:text-[#36d7b7] transition-colors duration-200"
                >
                  <span>Login</span>
                  <LoginIcon className="h-5 w-5" />
                </Link>
              ) : (
                <div className="space-y-4">
                  {/* User info */}
                  <div className="flex items-center gap-3 py-2">
                    {/* {session.user?.image && (
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#36d7b7]">
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )} */}
                    <div className="flex flex-col">
                      <span className="text-white font-medium text-sm">
                        {session.user?.name || session.user?.email}
                      </span>
                      <span className="text-gray-400 text-xs truncate max-w-[200px]">
                        {session.user?.email}
                      </span>
                    </div>
                  </div>
                  
                  {/* Sign out button */}
                  <Link
                    href="#"
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-white font-semibold text-xl py-3 hover:text-[#36d7b7] transition-colors duration-200"
                  >
                    <span>Sign Out</span>
                    <LogoutIcon className="h-5 w-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

// Extracted icon components for better organization
const LoginIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${className} transform group-hover:translate-x-1 transition-transform`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
  </svg>
);

// Added a LogoutIcon component
const LogoutIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${className} transform group-hover:translate-x-1 transition-transform`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
  </svg>
);

const HamburgerIcon = ({ isOpen }) => (
  <div className="w-7 flex flex-col gap-1.5">
    <span
      className={`bg-white block h-0.5 w-full rounded transition-all duration-300 ${
        isOpen ? "rotate-45 translate-y-2" : ""
      }`}
    ></span>
    <span
      className={`bg-white block h-0.5 w-full rounded transition-all duration-300 ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
    ></span>
    <span
      className={`bg-white block h-0.5 w-full rounded transition-all duration-300 ${
        isOpen ? "-rotate-45 -translate-y-2" : ""
      }`}
    ></span>
  </div>
);

const NavLink = React.memo(({ href, children, isActive }) => {
  return (
    <Link
      href={href}
      className={`text-gray-100 font-semibold tracking-wide text-lg relative px-2 py-2 group transition-colors duration-300 ${
        isActive ? STYLES.highlight : `hover:${STYLES.highlight}`
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#36d7b7] transition-all duration-300 group-hover:w-full ${
          isActive ? "w-full" : ""
        }`}
      ></span>
    </Link>
  );
});

NavLink.displayName = 'NavLink';
NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired
};

const MobileNavLink = React.memo(({ href, children, onClick, isActive }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block text-gray-100 text-xl font-medium py-3 hover:text-[#36d7b7] transition-colors duration-200 ${
        isActive ? "text-[#36d7b7]" : ""
      }`}
    >
      {children}
    </Link>
  );
});

MobileNavLink.displayName = 'MobileNavLink';
MobileNavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool
};

LoginIcon.propTypes = {
  className: PropTypes.string
};

LogoutIcon.propTypes = {
  className: PropTypes.string
};

HamburgerIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default Navbar;
