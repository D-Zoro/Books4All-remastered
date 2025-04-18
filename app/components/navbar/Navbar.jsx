"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Debounced scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    const debounce = setTimeout(handleScroll, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(debounce);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const closeMenu = () => setMobileMenuOpen(false);
      document.addEventListener("click", closeMenu);
      return () => document.removeEventListener("click", closeMenu);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback((e) => {
    e.stopPropagation();
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 ${montserrat.className}`}>
      <nav
        className={`transition-all duration-300 ease-in-out ${
          scrolled
            ? "py-2 bg-opacity-95 bg-[rgb(44,62,80)] shadow-lg"
            : "py-3 bg-gradient-to-b from-gray-800 to-gray-700 shadow-md"
        }`}
      >
        <div className="container mx-auto  flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Books4All Home" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/favicon.ico"
                  alt="Books4All"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-[#e2e8f0]">
                Books<span className="text-[rgb(26,188,156)]">4</span>All
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-10 mr-15 items-center">
            {["/buy", "/sell", "/ai-support", "/about"].map((link) => (
              <NavLink key={link} href={link} isActive={pathname === link}>
                {link.replace("/", "").charAt(0).toUpperCase() + link.slice(2)}
              </NavLink>
            ))}
          </div>

          {/* Auth Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/login"
              className="bg-[rgb(26,188,156)] hover:bg-[rgb(22,160,133)] text-white font-semibold text-lg px-8 py-2.5 rounded-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#e2e8f0] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-7 flex flex-col gap-1.5">
                <span
                  className={`bg-[#e2e8f0] block h-0.5 w-full rounded transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`bg-[#e2e8f0] block h-0.5 w-full rounded transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`bg-[#e2e8f0] block h-0.5 w-full rounded transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-5 px-6 py-6 bg-[rgb(44,62,80)] shadow-inner">
            {["/buy", "/sell", "/ai-support", "/about"].map((link) => (
              <MobileNavLink
                key={link}
                href={link}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.replace("/", "").charAt(0).toUpperCase() + link.slice(2)}
              </MobileNavLink>
            ))}

            <div className="pt-3 md:hidden border-t border-gray-600">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full bg-[rgb(26,188,156)] hover:bg-[rgb(22,160,133)] text-center text-[#f8fafc] font-semibold text-lg px-6 py-4 rounded-md transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NavLink = React.memo(({ href, children, isActive }) => {
  return (
    <Link
      href={href}
      className={`text-[#bfd1e5] font-semibold tracking-wide text-lg relative px-2 py-2 group transition-colors duration-300 ${
        isActive ? "text-[rgb(26,188,156)]" : "hover:text-[rgb(26,188,156)]"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(26,188,156)] transition-all duration-300 group-hover:w-full ${
          isActive ? "w-full" : ""
        }`}
      ></span>
    </Link>
  );
});

const MobileNavLink = React.memo(({ href, children, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-[#bfd1e5] text-xl font-medium py-2 border-b border-gray-600/30 hover:text-[rgb(26,188,156)] transition-colors duration-200"
    >
      {children}
    </Link>
  );
});

export default Navbar;
