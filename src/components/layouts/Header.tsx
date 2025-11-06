'use client'

import React, { useState, useMemo } from 'react'
import { ShoppingCart, Menu, Bell, Sun, Moon, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import UserMenu from './components/UserMenu'
import SearchBar from './components/SearchBar'
import Logo from '../common/Logo'
import {
  navigationItems,
  userNavigationItems,
  adminNavigationItems,
  vendorNavigationItems,
} from '@/common/constants/navigate.constant'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useCartApi } from '@/features/cart/hooks'
import { getNeumorphismShadow } from '@/common/constants/neumorphism'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { cartCount } = useCartApi()
  const neumorphismShadow = getNeumorphismShadow(theme)

  // Background color cho các nút để dễ nhìn hơn trong cả light và dark mode
  const buttonBackgroundColor = theme === 'light' ? '#ffffff' : '#2a2a2a'

  const currentNavigationItems = useMemo(() => {
    if (!isAuthenticated || !user) {
      return navigationItems
    }

    if (user.roles.includes('admin')) {
      return adminNavigationItems
    } else if (user.roles.includes('vendor')) {
      return vendorNavigationItems
    } else {
      return userNavigationItems
    }
  }, [isAuthenticated, user])

  const notificationCount = 0

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className="sticky top-0 z-30 w-full backdrop-blur-3xl border-b"
      style={{
        backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(42, 42, 42, 0.8)',
        borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Row: User Menu and Notifications - Only for authenticated users */}
        {isAuthenticated && user && (
          <div
            className="hidden lg:flex items-center justify-end gap-2"
            style={{
              borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Theme Toggle */}
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full hover:bg-accent-primary/10 transition-all cursor-pointer "
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Notifications - Only for non-admin users */}
            {!user.roles.includes('admin') && (
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-accent-primary/10 transition-all"
                asChild
              >
                <Link href="/notifications">
                  <Bell className="h-4 w-4" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500 text-white border-2 border-background">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            )}

            {/* User Menu */}
            <UserMenu />
          </div>
        )}

        {/* Second Row: Logo, Search Bar, and Cart */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
          >
            <Logo showText={false} imageSize={50} />
            <h1 className="text-[1.6rem] font-bold">AIC</h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-10">
            <SearchBar />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Shopping Cart - Only for non-admin authenticated users */}
            {isAuthenticated && user && !user.roles.includes('admin') && (
              <Link
                href="/cart"
                className="relative hidden lg:flex items-center justify-center w-10 h-10 transition-all hover:scale-105"
              >
                <ShoppingCart className="h-7 w-7" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-7 w-7 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-red-500 text-white border-3 border-background shadow-md">
                    {cartCount > 9 ? '9+' : cartCount}
                  </Badge>
                )}
              </Link>
            )}

            {/* Mobile Actions - Theme, Notifications, Cart */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Theme Toggle - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-accent-primary/10 transition-all"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Notifications - Mobile */}
              {isAuthenticated && user && !user.roles.includes('admin') && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full hover:bg-accent-primary/10 transition-all"
                    asChild
                  >
                    <Link href="/notifications">
                      <Bell className="h-5 w-5" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500 text-white border-2 border-background">
                          {notificationCount > 9 ? '9+' : notificationCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>

                  {/* Cart - Mobile */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full hover:bg-accent-primary/10 transition-all"
                    asChild
                  >
                    <Link href="/cart">
                      <ShoppingCart className="h-5 w-5" />
                      {cartCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-accent-primary text-white border-2 border-background">
                          {cartCount > 9 ? '9+' : cartCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                </>
              )}

              {/* User Menu - Mobile */}
              <div className="md:block lg:hidden">
                <UserMenu />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full hover:bg-accent-primary/10 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Third Row: Desktop Navigation - Only show when authenticated */}
        {isAuthenticated && (
          <div
            className="hidden lg:flex items-center justify-center pb-2"
            style={{
              borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <nav className="flex items-center gap-2">
              {currentNavigationItems.map((item) => {
                const active = isActive(item.href) || item.active

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative z-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'text-accent-primary bg-accent-primary/10'
                        : 'text-foreground hover:text-accent-primary hover:bg-accent-primary/5'
                    }`}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-accent-primary rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="lg:hidden border-t py-4 space-y-4"
            style={{
              borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Mobile Search */}
            <div className="px-2">
              <SearchBar />
            </div>

            {/* Mobile Navigation */}
            {isAuthenticated && (
              <nav className="flex flex-col gap-1 px-2">
                {currentNavigationItems.map((item) => {
                  const active = isActive(item.href) || item.active

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? 'text-accent-primary bg-accent-primary/10'
                          : 'text-foreground hover:text-accent-primary hover:bg-accent-primary/5'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            )}

            {/* Mobile User Menu */}
            <div className="px-2">
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
