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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { cartCount } = useCartApi()

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
    <header className="sticky top-0 z-50 w-full  border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <Logo showText={false} imageSize={32} />
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
              <div className="flex items-center gap-6">
                {currentNavigationItems.map((item) => {
                  const active = isActive(item.href) || item.active
                  const isHovered = hoveredItem === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative text-sm font-medium transition-colors ${
                        active ? 'text-accent-primary' : 'text-muted-foreground'
                      } hover:text-accent-primary`}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {item.label}
                      {(active || isHovered) && (
                        <motion.div
                          layoutId={`underline-${item.href}`}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
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
              className="hover:bg-accent-primary/10"
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
                  className="relative hover:bg-accent-primary/10"
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
                  className="relative hover:bg-accent-primary/10"
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
              className="md:hidden hover:bg-accent-primary/10"
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
