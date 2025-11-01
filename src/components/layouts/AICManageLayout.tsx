'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Search, Bell, Settings, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import UserMenu from './components/UserMenu'
import {
  userNavigationItems,
  adminNavigationItems,
  vendorNavigationItems,
} from '@/common/constants/navigate.constant'
import { motion, AnimatePresence } from 'framer-motion'

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
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 flex w-full h-screen bg-white/80 backdrop-blur-xl border-2 border-purple-200/50 overflow-hidden shadow-2xl">
        {/* Modern Sidebar with Gradient */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`
          relative flex flex-col bg-gradient-to-b from-white/90 to-purple-50/50 backdrop-blur-xl border-r-2 border-purple-200/50 transition-all duration-300 py-6 px-4 h-screen overflow-y-auto overflow-x-hidden shadow-xl
          ${sidebarExpanded ? 'w-64' : 'w-20'}
        `}
        >
          {/* Modern Logo with Gradient */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center ${
                sidebarExpanded ? 'justify-start' : 'justify-center w-full'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 relative">
                  <Sparkles className="h-5 w-5 text-white absolute" />
                  <span className="text-white font-bold text-sm relative z-10">AI</span>
                </div>
                <AnimatePresence>
                  {sidebarExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-black text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      AICShop
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Modern Toggle Button */}
          <div
            className={`flex items-center mb-8 ${
              sidebarExpanded ? 'justify-end' : 'justify-center'
            }`}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="w-9 h-9 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 backdrop-blur-sm border-2 border-purple-300/50 shadow-md hover:shadow-lg rounded-xl transition-all duration-200"
                title={sidebarExpanded ? 'Thu gọn' : 'Mở rộng'}
              >
                <motion.div
                  animate={{ rotate: sidebarExpanded ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {sidebarExpanded ? (
                    <ChevronLeft className="h-4 w-4 text-purple-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-purple-600" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Modern Navigation with Animations */}
          <nav className="flex-1">
            <div className="space-y-2">
              {currentNavigationItems.map((item, index) => {
                const isActive = isRouteActive(item.href)
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={`w-full justify-start transition-all duration-200 rounded-xl ${
                        sidebarExpanded ? 'px-4 h-12' : 'px-2 h-12'
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-700 border border-transparent hover:border-purple-200'
                      }`}
                      asChild
                    >
                      <a href={item.href}>
                        {IconComponent && (
                          <motion.div
                            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            <IconComponent
                              className={`h-5 w-5 ${sidebarExpanded ? 'mr-3' : ''} ${
                                isActive ? 'drop-shadow-lg' : ''
                              }`}
                            />
                          </motion.div>
                        )}
                        <AnimatePresence>
                          {sidebarExpanded && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`text-sm font-semibold whitespace-nowrap ${
                                isActive ? 'drop-shadow' : ''
                              }`}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </a>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </nav>

          {/* Modern Bottom Controls */}
          <div className="py-4 space-y-2 border-t-2 border-purple-200/50">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                className={`
                  w-full transition-all duration-200 rounded-xl
                  ${
                    sidebarExpanded
                      ? 'px-4 py-3 h-12 justify-start'
                      : 'w-12 h-12 p-0 justify-center'
                  }
                  bg-gradient-to-r from-gray-100 to-gray-200 hover:from-purple-100 hover:to-blue-100 border border-gray-300 hover:border-purple-300 text-gray-700 hover:text-purple-700
                `}
              >
                <Settings className={`h-5 w-5 ${sidebarExpanded ? 'mr-3' : ''}`} />
                <AnimatePresence>
                  {sidebarExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-semibold text-sm whitespace-nowrap"
                    >
                      Settings
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Modern Header with Gradient */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`h-20 flex items-center justify-end px-6 lg:px-8 flex-shrink-0 backdrop-blur-xl transition-all duration-300 border-b-2 ${
              isScrolled
                ? 'bg-white/80 border-purple-200/50 shadow-lg'
                : 'bg-white/50 border-transparent'
            }`}
          >
            {/* Right side - Search, Notifications, User */}
            <div className="flex items-center gap-4">
              {/* Modern Search */}
              {showSearch && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="hidden md:flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-white to-purple-50 rounded-xl border-2 border-purple-200/50 min-w-[320px] shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Search className="w-5 h-5 text-purple-600" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm placeholder:text-gray-400 font-medium"
                  />
                </motion.div>
              )}

              {/* Modern Notifications */}
              {showNotifications && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border-2 border-purple-300/50 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Bell className="h-5 w-5 text-purple-600" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 500 }}
                    >
                      <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg border-2 border-white">
                        3
                      </Badge>
                    </motion.div>
                  </Button>
                </motion.div>
              )}

              {/* User Menu */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <UserMenu />
              </motion.div>
            </div>
          </motion.header>

          {/* Main Content - Scrollable with Modern Style */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-transparent via-purple-50/30 to-blue-50/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className={fullWidth ? 'w-full' : 'max-w-8xl mx-auto p-8'}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AICManageLayout
