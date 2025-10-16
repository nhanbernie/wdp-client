'use client'

import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import UserMenu from './components/UserMenu'
import MobileMenu from './components/MobileMenu'
import Logo from '../common/Logo'
import { navigationItems } from '@/common/constants/navigate.constant'
import SearchBar from './components/SearchBar'
import NavigateButtons from './components/NavigateButtons'
import NotificationBadge from './components/NotificationBadge'
import CartBadge from './components/CartBadge'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

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
    <>
      <div className="w-full h-[var(--header-height)] z-50 fixed bg-[var(--background)] shadow-xl md:px-36 flex items-center justify-between">
        <div className="flex items-center w-1/2">
          {/* Logo section */}
          <div className="">
            <Link href="/">
              <Logo showText={true} />
            </Link>
          </div>

          {/* Search section */}
          <div className="w-full hidden md:block">
            <SearchBar />
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-end gap-8">
          {/* Navigate Button */}
          <div className="hidden xl:flex">
            <NavigateButtons />
          </div>

          {/* Badges */}
          <div className="flex gap-6">
            <NotificationBadge />
            <CartBadge />
          </div>

          {/* User Menu */}
          <div className="hidden lg:block">
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
