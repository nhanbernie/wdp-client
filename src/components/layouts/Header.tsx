'use client'

import React, { useState, useMemo } from 'react'
import { Search, ShoppingCart, Menu, MessageCircle, Bell } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { useCartApi } from '@/features/cart/hooks'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo showText={false} imageSize={32} />
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm vật liệu xây dựng..."
                className="pl-10 bg-muted/50"
              />
            </div>
          </div>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6">
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
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex hover:bg-accent-primary/10"
                asChild
              >
                <Link href="/ai-chat">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  AI Hỗ trợ
                </Link>
              </Button>
            )}

            {isAuthenticated && user && !user.roles.includes('admin') && (
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent-primary/10"
                asChild
              >
                <Link href="/notifications">
                  <Bell className="h-4 w-4" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            )}

            {isAuthenticated && user && !user.roles.includes('admin') && (
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent-primary/10"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cartCount > 9 ? '9+' : cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            )}

            <UserMenu />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm vật liệu xây dựng..."
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              {currentNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    item.active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <Link href="/ai-chat" onClick={() => setIsMenuOpen(false)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    AI Hỗ trợ
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
