'use client'

import React, { useState } from 'react'
import { Search, Menu, Globe } from 'lucide-react'
import UserMenu from './components/UserMenu'
import MobileMenu from './components/MobileMenu'
import Logo from '../common/Logo'
import { navigationItems } from '@/common/constants/navigate.constant'
import Navigation from './components/Navigation'
import { motion } from 'motion/react'
import SearchBar from './components/SearchBar'
import NavigateButtons from './components/NavigateButtons'
import NotificationBadge from './components/NotificationBadge'
import CartBadge from './components/CartBadge'

// Main Header component
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    // <>
    //   {/* Floating rounded header */}
    //   <motion.header
    //     initial={{ y: -100, opacity: 0 }}
    //     animate={{ y: 0, opacity: 1 }}
    //     transition={{ duration: 0.6, ease: "easeOut" }}
    //     className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 w-full max-w-7xl px-4"
    //   >
    //     <div className="rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-lg border border-white/10 backdrop-blur-27 bg-header-blur">
    //       <div className="flex items-center justify-between gap-4 sm:gap-8 lg:gap-12 w-full">
    //         {/* Left side - Logo */}
    //         <div className="flex items-center flex-shrink-0">
    //           <Logo showText={false} />
    //         </div>

    //         {/* Center - Navigation (hidden on mobile) */}
    //         <nav className="hidden lg:flex items-center flex-1 justify-center">
    //           <Navigation items={navigationItems} />
    //         </nav>

    //         {/* Right side - Actions */}
    //         <div className="flex items-center gap-2 sm:gap-3">
    //           {/* Action buttons - hidden on small screens */}
    //           <div className="hidden sm:flex items-center gap-2">
    //             <motion.button
    //               whileHover={{ scale: 1.1 }}
    //               whileTap={{ scale: 0.95 }}
    //               className="p-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/10"
    //             >
    //               <Search size={18} />
    //             </motion.button>
    //             <motion.button
    //               whileHover={{ scale: 1.1 }}
    //               whileTap={{ scale: 0.95 }}
    //               className="p-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/10"
    //             >
    //               <Globe size={18} />
    //             </motion.button>
    //           </div>

    //           {/* User Menu */}
    //           <UserMenu />

    //           {/* Mobile menu button */}
    //           <button
    //             onClick={handleMobileMenuToggle}
    //             className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
    //           >
    //             <Menu size={20} />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </motion.header>

    //   {/* Mobile Menu */}
    //   <MobileMenu
    //     isOpen={isMobileMenuOpen}
    //     onClose={handleMobileMenuClose}
    //     navigationItems={navigationItems}
    //   />
    // </>

    <>
      <div className="w-full h-[var(--header-height)] z-50 fixed bg-black md:px-36 flex items-center justify-between">
        <div className="flex items-center w-1/2">
          {/* Logo section */}
          <div className="">
            <Logo showText={true} />
          </div>

          {/* Search section */}
          <div className="w-full hidden md:block">
            <SearchBar />
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-end gap-8">
          {/* Navigate Button */}
          <div className="hidden lg:flex">
            <NavigateButtons />
          </div>

          {/* Badges */}
          <div className="flex gap-6">
            <NotificationBadge />
            <CartBadge />
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <Menu size={20} />
          </button>

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            navigationItems={navigationItems}
          />
        </div>
      </div>
    </>
  )
}

export default Header
