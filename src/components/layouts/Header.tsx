"use client";

import React, { useState, useEffect } from "react";
import { Search, MessageSquare, Menu, Globe } from "lucide-react";
import UserMenu from "./components/UserMenu";
import MobileMenu from "./components/MobileMenu";
import Logo from "../common/Logo";
import { navigationItems } from "@/constants/navigate.constant";
import Navigation from "./components/Navigation";
import { motion } from "motion/react";
// import { ThemeToggle } from "@/components/common/";

// Action buttons component
const ActionButtons = ({
  onMobileMenuToggle,
}: {
  onMobileMenuToggle: () => void;
}) => (
  <div className="flex items-center gap-3">
    {/* Search button */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      <Search size={20} />
    </motion.button>

    {/* Messages button */}

    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      <MessageSquare size={20} />
    </motion.button>

    {/* Language selector */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      <Globe className="w-5 h-5" />
    </motion.button>
    {/* User Menu */}

    {/* <ThemeToggle /> */}

    <UserMenu />
    {/* Mobile menu button */}
    <button
      onClick={onMobileMenuToggle}
      className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
    >
      <Menu size={20} />
    </button>
  </div>
);

// Main Header component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-sm bg-white/80 shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <nav className="hidden md:flex items-center gap-8">
              <Navigation items={navigationItems} />
            </nav>

            {/* Right side - Actions */}
            <ActionButtons onMobileMenuToggle={handleMobileMenuToggle} />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        navigationItems={navigationItems}
      />
    </>
  );
};

export default Header;
