'use client'

import React, { useState, useMemo } from 'react'
import { Menu, Sparkles } from 'lucide-react'
import UserMenu from './components/UserMenu'
import MobileMenu from './components/MobileMenu'
import Logo from '../common/Logo'
import {
  navigationItems,
  userNavigationItems,
  adminNavigationItems,
  vendorNavigationItems,
} from '@/common/constants/navigate.constant'
import SearchBar from './components/SearchBar'
import NavigateButtons from './components/NavigateButtons'
import NotificationBadge from './components/NotificationBadge'
import CartBadge from './components/CartBadge'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

// Main Header component
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  const { isAuthenticated, isLoading, user } = useAuth()

  // Determine navigation items based on user role
  const currentNavigationItems = useMemo(() => {
    if (!isAuthenticated || !user) {
      return navigationItems
    }

    // Check user role and return appropriate navigation
    if (user.roles.includes('admin')) {
      return adminNavigationItems
    } else if (user.roles.includes('vendor')) {
      return vendorNavigationItems
    } else {
      return userNavigationItems
    }
  }, [isAuthenticated, user])

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full h-[var(--header-height)] z-50 fixed backdrop-blur-xl bg-white/80 border-b-2 border-slate-200 shadow-2xl md:px-36 flex items-center justify-between"
      >
        {/* Gradient overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-purple-50/30 to-pink-50/30 pointer-events-none" />

        <div className="relative flex items-center w-1/2 gap-6">
          {/* Logo section */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
            <Link href="/">
              <div className="relative">
                <Logo showText={true} />
                {/* Sparkle effect */}
                {isAuthenticated && (
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </motion.div>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Search section - only show when authenticated */}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full hidden md:block"
            >
              <SearchBar />
            </motion.div>
          )}
        </div>

        <div className="relative w-1/2 flex items-center justify-end gap-6">
          {/* Navigate Button - show for all authenticated users */}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden xl:flex"
            >
              <NavigateButtons navigationItems={currentNavigationItems} />
            </motion.div>
          )}

          {/* Badges - only show for regular users, not admin */}
          {isAuthenticated && user && !user.roles.includes('admin') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="flex gap-4"
            >
              <NotificationBadge />
              <CartBadge />
            </motion.div>
          )}

          {/* User Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:block"
          >
            <UserMenu />
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-3 rounded-xl transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-600"
          >
            <Menu size={20} />
          </motion.button>

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            navigationItems={currentNavigationItems}
          />
        </div>
      </motion.div>
    </>
  )
}

export default Header
