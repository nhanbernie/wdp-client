"use client";

import React, { useState, useEffect } from "react";
import { Search, MessageSquare, Menu, Globe } from "lucide-react";
import UserMenu from "./components/UserMenu";
import MobileMenu from "./components/MobileMenu";
import Logo from "../common/Logo";
import { navigationItems } from "@/common/constants/navigate.constant";
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
      className="p-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/10"
    >
      <Search size={20} />
    </motion.button>

    {/* Messages button */}

    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/10"
    >
      <MessageSquare size={20} />
    </motion.button>

    {/* Language selector */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/10"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating rounded header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300"
      >
        <div className="rounded-full px-8 py-4 shadow-lg border border-white/10 backdrop-blur-27 bg-header-blur">
          <div className="flex items-center justify-between gap-12 min-w-[600px]">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Logo showText={false} />
            </div>

            {/* Center - Navigation */}
            <nav className="hidden md:flex items-center">
              <Navigation items={navigationItems} />
            </nav>

            {/* Right side - Sign Up Button */}
            <div className="flex items-center">
              <UserMenu />
            </div>
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
