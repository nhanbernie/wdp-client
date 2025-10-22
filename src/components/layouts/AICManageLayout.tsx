'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Search, Bell, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import UserMenu from './components/UserMenu'
import {
  userNavigationItems,
  adminNavigationItems,
  vendorNavigationItems,
} from '@/common/constants/navigate.constant'
import AICManageSidebar from './components/AICManageSidebar'

interface AICManageLayoutProps {
  children: ReactNode
  navigationItems?: typeof userNavigationItems
  showSearch?: boolean
  showNotifications?: boolean
  userRole?: 'admin' | 'user' | 'vendor'
  fullWidth?: boolean
}

const AICManageLayout: React.FC<AICManageLayoutProps> = ({
  children,
  navigationItems = userNavigationItems,
  showSearch = true,
  showNotifications = true,
  userRole = 'user',
  fullWidth = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if route is active
  const isRouteActive = (href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href))
  }

  // Get appropriate navigation items based on role
  const getNavigationItems = () => {
    switch (userRole) {
      case 'admin':
        return adminNavigationItems
      case 'vendor':
        return vendorNavigationItems
      default:
        return navigationItems
    }
  }

  const currentNavigationItems = getNavigationItems()

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(148, 163, 184, 0.1) 0%, transparent 60%)`,
          }}
        ></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 flex w-full h-screen bg-card border border-border overflow-hidden shadow-lg">
        {/* Sidebar - Fixed */}
        <AICManageSidebar userRole="admin" className={`h-full`} />

        {/* Main content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Header - Fixed */}
          <header
            className={`h-20 flex items-center justify-end px-6 lg:px-8 flex-shrink-0 ${
              isScrolled ? 'bg-background/80' : 'bg-transparent'
            }`}
          >
            {/* Right side - Search, Notifications, User */}
            <div className="flex items-center gap-3">
              {/* Search */}
              {showSearch && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-lg border border-border min-w-[300px]">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm"
                  />
                </div>
              )}

              {/* Notifications */}
              {showNotifications && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative p-2 rounded-lg hover:bg-muted"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
              )}

              {/* User Menu */}
              <UserMenu />
            </div>
          </header>

          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className={fullWidth ? 'w-full' : 'max-w-8xl mx-auto p-8'}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AICManageLayout
