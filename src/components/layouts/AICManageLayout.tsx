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

interface AICManageLayoutProps {
  children: ReactNode
  navigationItems?: typeof userNavigationItems
  showSearch?: boolean
  showNotifications?: boolean
  userRole?: 'admin' | 'user' | 'vendor'
}

const AICManageLayout: React.FC<AICManageLayoutProps> = ({
  children,
  navigationItems = userNavigationItems,
  showSearch = true,
  showNotifications = true,
  userRole = 'user',
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
       {/* Background with gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        {/* Enhanced blur pattern overlay */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(148, 163, 184, 0.15) 0%, transparent 60%),
                           radial-gradient(circle at 80% 70%, rgba(156, 163, 175, 0.15) 0%, transparent 60%),
                           radial-gradient(circle at 40% 80%, rgba(139, 146, 158, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Main glassmorphism container */}
      <div className="relative z-10 flex w-full h-screen bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl backdrop-saturate-150 border border-white/30 dark:border-slate-700/30 overflow-hidden shadow-2xl shadow-slate-200/20 dark:shadow-black/10">
        {/* Sidebar - Fixed */}
        <aside
          className={`
          relative flex flex-col bg-transparent transition-all duration-300 py-6 px-4 h-screen overflow-y-auto overflow-x-hidden
          ${sidebarExpanded ? 'w-64' : 'w-20'}
        `}
        >
          {/* Logo - Always visible */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`flex items-center ${
                sidebarExpanded ? 'justify-start' : 'justify-center w-full'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AI</span>
                </div>
                {sidebarExpanded && <span className="font-bold text-xl">AICShop</span>}
              </div>
            </div>
          </div>

          {/* Toggle Button - Always visible */}
          <div
            className={`flex items-center mb-8 ${
              sidebarExpanded ? 'justify-end' : 'justify-center'
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="w-8 h-8 bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 shadow-sm rounded-lg transition-all duration-200"
              title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              {sidebarExpanded ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <div className="space-y-2">
              {currentNavigationItems.map((item) => {
                const isActive = isRouteActive(item.href)
                return (
                  <Button
                    key={item.label}
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start transition-all duration-200 ${
                      sidebarExpanded ? 'px-4' : 'px-2'
                    } ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                    }`}
                    asChild
                  >
                    <a href={item.href}>
                      <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                    </a>
                  </Button>
                )
              })}
            </div>
          </nav>

          {/* Bottom controls */}
          <div className="py-4 space-y-2">
            {/* Theme Toggle */}
            <div
              className={`
              flex items-center transition-all duration-200
              ${
                sidebarExpanded
                  ? 'gap-3 px-4 py-3 rounded-lg justify-start'
                  : 'justify-center w-12 h-12 rounded-lg bg-gray-100/60 dark:bg-gray-700/60'
              }
              ${
                sidebarExpanded
                  ? 'text-gray-600 dark:text-gray-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-600/80'
              }
            `}
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <Settings className="h-4 w-4" />
              </div>
              {sidebarExpanded && (
                <span className="font-medium text-sm whitespace-nowrap">Settings</span>
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Header - Fixed */}
          <header
            className={`h-20 flex items-center justify-end px-6 lg:px-8 flex-shrink-0 ${
              isScrolled ? 'backdrop-blur-sm bg-background/80' : 'bg-transparent'
            }`}
          >
            {/* Right side - Search, Notifications, User */}
            <div className="flex items-center gap-3">
              {/* Search */}
              {showSearch && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur-sm rounded-2xl border border-border min-w-[300px]">
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
                  className="relative p-2 rounded-xl hover:bg-muted/50"
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
            <div className="max-w-8xl mx-auto p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AICManageLayout
