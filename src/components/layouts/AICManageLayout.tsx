'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Settings, ChevronLeft, ChevronRight, Store, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import UserMenu from './components/UserMenu'
import {
  userNavigationItems,
  adminNavigationItems,
  vendorNavigationItems,
} from '@/common/constants/navigate.constant'
import { useTheme } from '@/contexts/ThemeContext'
import { getNeumorphismShadow } from '@/common/constants/neumorphism'

interface AICManageLayoutProps {
  children: ReactNode
  navigationItems?: typeof userNavigationItems
  showNotifications?: boolean
  userRole?: 'admin' | 'user' | 'vendor'
  fullWidth?: boolean
}

const AICManageLayout: React.FC<AICManageLayoutProps> = ({
  children,
  navigationItems = userNavigationItems,
  showNotifications = true,
  userRole = 'user',
  fullWidth = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const pathname = usePathname()
  const { colors, theme, toggleTheme } = useTheme()

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
    <div
      className="h-screen flex relative overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Main container */}
      <div
        className="relative z-10 flex w-full h-screen overflow-hidden"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        {/* Sidebar */}
        <aside
          className={`relative flex flex-col transition-all duration-300 py-6 px-4 h-screen overflow-y-auto overflow-x-hidden ${
            sidebarExpanded ? 'w-64' : 'w-20'
          }`}
          style={{
            backgroundColor: colors.cardBackground,
            borderRight: `1px solid ${colors.border}`,
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-between mb-6">
            <div
              className={`flex items-center ${
                sidebarExpanded ? 'justify-start' : 'justify-center w-full'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Store className="h-5 w-5" style={{ color: colors.background }} />
                </div>
                {sidebarExpanded && (
                  <span className="font-black text-2xl" style={{ color: colors.text }}>
                    AICShop
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Toggle Button */}
          <div
            className={`flex items-center mb-8 ${
              sidebarExpanded ? 'justify-end' : 'justify-center'
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="w-9 h-9 rounded-xl transition-all duration-200"
              style={{
                backgroundColor: `${colors.accent}20`,
                borderColor: colors.border,
                border: `1px solid ${colors.border}`,
              }}
              title={sidebarExpanded ? 'Thu gọn' : 'Mở rộng'}
            >
              {sidebarExpanded ? (
                <ChevronLeft className="h-4 w-4" style={{ color: colors.accent }} />
              ) : (
                <ChevronRight className="h-4 w-4" style={{ color: colors.accent }} />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <div className="space-y-2">
              {currentNavigationItems.map((item) => {
                const isActive = isRouteActive(item.href)
                const IconComponent = item.icon
                return (
                  <div key={item.label}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={`w-full justify-start transition-all duration-200 rounded-xl ${
                        sidebarExpanded ? 'px-4 h-12' : 'px-2 h-12'
                      }`}
                      style={{
                        backgroundColor: isActive ? colors.accent : 'transparent',
                        color: isActive ? colors.background : colors.text,
                        border: isActive ? 'none' : `1px solid transparent`,
                      }}
                      asChild
                    >
                      <a href={item.href}>
                        {IconComponent && (
                          <IconComponent className={`h-5 w-5 ${sidebarExpanded ? 'mr-3' : ''}`} />
                        )}
                        {sidebarExpanded && (
                          <span className="text-sm font-semibold whitespace-nowrap">
                            {item.label}
                          </span>
                        )}
                      </a>
                    </Button>
                  </div>
                )
              })}
            </div>
          </nav>

          {/* Bottom Controls */}
          <div className="py-4 space-y-2" style={{ borderTop: `1px solid ${colors.border}` }}>
            <Button
              variant="ghost"
              className={`w-full transition-all duration-200 rounded-xl ${
                sidebarExpanded ? 'px-4 py-3 h-12 justify-start' : 'w-12 h-12 p-0 justify-center'
              }`}
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              <Settings className={`h-5 w-5 ${sidebarExpanded ? 'mr-3' : ''}`} />
              {sidebarExpanded && (
                <span className="font-semibold text-sm whitespace-nowrap">Settings</span>
              )}
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <header
            className="h-20 flex items-center justify-end px-6 lg:px-8 flex-shrink-0 transition-all duration-300"
            style={{
              backgroundColor: isScrolled ? colors.cardBackground : colors.background,
              borderBottom: `1px solid ${isScrolled ? colors.border : 'transparent'}`,
            }}
          >
            {/* Right side - Theme Toggle, Notifications, User */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: `${colors.accent}20`,
                  borderColor: colors.border,
                  border: `1px solid ${colors.border}`,
                }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" style={{ color: colors.accent }} />
                ) : (
                  <Moon className="h-5 w-5" style={{ color: colors.accent }} />
                )}
              </Button>

              {/* Notifications */}
              {showNotifications && (
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-12 h-12 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: `${colors.accent}20`,
                      borderColor: colors.border,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <Bell className="h-5 w-5" style={{ color: colors.accent }} />
                    <Badge
                      className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                      style={{
                        backgroundColor: colors.error,
                        color: colors.background,
                        backgroundImage: 'none',
                        borderColor: colors.background,
                        border: `2px solid ${colors.background}`,
                      }}
                    >
                      3
                    </Badge>
                  </Button>
                </div>
              )}

              {/* User Menu */}
              <div>
                <UserMenu />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main
            className="flex-1 overflow-y-auto overflow-x-hidden"
            style={{ backgroundColor: colors.background }}
          >
            <div className={fullWidth ? 'w-full' : 'max-w-8xl mx-auto p-8'}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AICManageLayout
