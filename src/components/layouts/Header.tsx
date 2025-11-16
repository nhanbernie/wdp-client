'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { ShoppingCart, Menu, Bell, Sun, Moon, Search } from 'lucide-react'
import Link from 'next/link'
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
import { useSocket } from '@/contexts/SocketContext'
import { NotificationsPanel } from './components/NotificationsPanel'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { cartCount } = useCartApi()
  const neumorphismShadow = getNeumorphismShadow(theme)
  const { socket, isConnected } = useSocket()
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<
    { id: string; title: string; createdAt: Date }[]
  >([])
  const [isNotiOpen, setIsNotiOpen] = useState(false)

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

  // Listen realtime order_created to bump header bell and store a simple in-memory list
  useEffect(() => {
    if (!socket || !isConnected) return
    const onOrderCreated = (data: any) => {
      setUnreadCount((c) => Math.min(c + 1, 99))
      setNotifications((prev) => [
        {
          id: data?.orderId || `order-${Date.now()}`,
          title:
            data?.orderNumber
              ? `Đơn hàng ${data.orderNumber} đã được tạo`
              : 'Đơn hàng mới đã được tạo',
          createdAt: new Date(data?.createdAt || Date.now()),
        },
        ...prev,
      ])
    }
    socket.on('order_created', onOrderCreated)
    return () => {
      socket.off('order_created', onOrderCreated)
    }
  }, [socket, isConnected])

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
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Logo showText={false} imageSize={32} />
          </Link>

          {/* Navigation - Center - Only for authenticated users */}
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

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Icon - Navigate to categories */}
            <Button
              variant="ghost"
              size="icon"
              className="bg-card text-foreground hover:text-accent-primary"
              style={{
                boxShadow: neumorphismShadow,
                backgroundColor: buttonBackgroundColor,
              }}
              asChild
            >
              <Link href="/categories">
                <Search className="h-4 w-4" />
              </Link>
            </Button>

            {/* Theme Toggle */}
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

            {/* Notifications and Cart - Only for non-admin authenticated users */}
            {isAuthenticated && user && !user.roles.includes('admin') && (
              <>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative bg-card text-foreground hover:text-accent-primary"
                    style={{
                      boxShadow: neumorphismShadow,
                      backgroundColor: buttonBackgroundColor,
                    }}
                    onClick={() => {
                      setUnreadCount(0)
                      setIsNotiOpen((v) => !v)
                    }}
                  >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent-primary">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Badge>
                    )}
                  </Button>
                  <NotificationsPanel
                    open={isNotiOpen}
                    items={notifications}
                    onClose={() => setIsNotiOpen(false)}
                    onMarkRead={() => {
                      setUnreadCount(0)
                      setIsNotiOpen(false)
                    }}
                  />
                </div>

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

            {/* User Menu */}
            <UserMenu />

            {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            {/* Mobile Navigation */}
            {isAuthenticated && (
              <nav className="flex flex-col gap-3 px-2">
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
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
