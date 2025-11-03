'use client'

import React, { useState, useMemo } from 'react'
import { ShoppingCart, Menu, Bell, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import UserMenu from './components/UserMenu'
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
      className="sticky top-0 z-50 w-full bg-transparent"
      style={{
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <Logo showText={false} imageSize={32} />
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-3">
                {currentNavigationItems.map((item) => {
                  const active = isActive(item.href) || item.active
                  const isHovered = hoveredItem === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 bg-card ${
                        active ? 'text-accent-primary' : 'text-foreground'
                      } hover:text-accent-primary`}
                      style={{
                        boxShadow: neumorphismShadow,
                        backgroundColor: buttonBackgroundColor,
                      }}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </nav>
          )}

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="bg-card text-foreground hover:text-accent-primary"
              style={{
                boxShadow: neumorphismShadow,
                backgroundColor: buttonBackgroundColor,
              }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {isAuthenticated && user && !user.roles.includes('admin') && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-card text-foreground hover:text-accent-primary"
                  style={{
                    boxShadow: neumorphismShadow,
                    backgroundColor: buttonBackgroundColor,
                  }}
                  asChild
                >
                  <Link href="/notifications">
                    <Bell className="h-4 w-4" />
                    {notificationCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent-primary">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </Badge>
                    )}
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative bg-card text-foreground hover:text-accent-primary"
                  style={{
                    boxShadow: neumorphismShadow,
                    backgroundColor: buttonBackgroundColor,
                  }}
                  asChild
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent-primary">
                        {cartCount > 9 ? '9+' : cartCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </>
            )}

            <UserMenu />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-card text-foreground hover:text-accent-primary"
              style={{
                boxShadow: neumorphismShadow,
                backgroundColor: buttonBackgroundColor,
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-3">
              {currentNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors py-2 ${
                    item.active || isActive(item.href)
                      ? 'text-accent-primary'
                      : 'text-muted-foreground hover:text-accent-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="justify-start hover:bg-accent-primary/10"
                onClick={() => {
                  toggleTheme()
                  setIsMenuOpen(false)
                }}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
