'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  useLoginMutation,
  useRegisterMutation,
  useProfileQuery,
  useLogoutMutation,
} from '@/services/auth/auth.service'
import { StorageService } from '@/services/storage/secureStorage.service'
import { useToast } from '@/hooks/useToast'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user' | 'vendor'
  roles: string[]
  approvedStatus?: string | null
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
  refreshUserProfile: () => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false)
  const hasRedirected = useRef(false) // Track if we've already redirected
  const router = useRouter()
  const [logoutMutation] = useLogoutMutation()
  const toast = useToast()
  const {
    data: profileData,
    error: profileError,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useProfileQuery(undefined, {
    skip: !shouldFetchProfile,
  })

  useEffect(() => {
    checkAuthStatus()
  }, [])

  // Handle profile data success
  useEffect(() => {
    if (profileData?.success && profileData.data) {
      const { userId, email, roles, approvedStatus } = profileData.data

      let userRole: 'admin' | 'user' | 'vendor' = 'user'
      if (roles.includes('admin')) {
        userRole = 'admin'
      } else if (roles.includes('vendor')) {
        userRole = 'vendor'
      }

      const updatedUser: User = {
        id: userId,
        email: email,
        name: email.split('@')[0],
        role: userRole,
        roles: roles,
        approvedStatus: approvedStatus,
        avatar: undefined,
      }

      // IMPORTANT: Set user state FIRST before any redirects
      setUser(updatedUser)
      setShouldFetchProfile(false)
      setIsLoading(false)

      // Handle redirects based on role (only once per profile load)
      if (typeof window !== 'undefined' && !hasRedirected.current) {
        const currentPath = window.location.pathname

        // Don't redirect if user is already on an appropriate page for their role
        const isOnCorrectRolePage =
          (updatedUser.role === 'admin' && currentPath.startsWith('/admin')) ||
          (updatedUser.role === 'vendor' && currentPath.startsWith('/vendor')) ||
          (updatedUser.role === 'user' &&
            !currentPath.startsWith('/admin') &&
            !currentPath.startsWith('/vendor'))

        if (isOnCorrectRolePage) {
          hasRedirected.current = true // Mark as handled
          return
        }

        // Redirect if on wrong role page or public pages
        const shouldRedirect =
          currentPath === '/login' ||
          currentPath === '/register' ||
          currentPath === '/' ||
          (updatedUser.role === 'admin' && !currentPath.startsWith('/admin')) ||
          (updatedUser.role === 'vendor' && !currentPath.startsWith('/vendor'))

        if (shouldRedirect) {
          hasRedirected.current = true // Mark as redirected
          if (updatedUser.role === 'admin') {
            router.push('/admin')
          } else if (updatedUser.role === 'vendor') {
            router.push('/vendor')
          } else {
            router.push('/')
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData])

  // Handle profile fetch error
  useEffect(() => {
    if (profileError) {
      console.error('Failed to fetch profile:', profileError)
      setUser(null)
      setShouldFetchProfile(false)
      setIsLoading(false)
      // Clear auth data if profile fetch fails
      StorageService.clearAuthData()
    }
  }, [profileError])

  const checkAuthStatus = async () => {
    try {
      const token = await StorageService.getAccessToken()

      if (token) {
        setShouldFetchProfile(true)
      } else {
        // No token, stop loading immediately
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      // Clear invalid data
      await StorageService.clearAuthData()
      setIsLoading(false)
    }
  }

  const refreshUserProfile = () => {
    // Reset redirect flag when refreshing profile
    hasRedirected.current = false
    // Just set the flag, useEffect will handle the profile fetch
    setShouldFetchProfile(true)
  }

  const logout = async () => {
    try {
      const refreshToken = await StorageService.getRefreshToken()

      // Call logout API if refresh token exists
      if (refreshToken) {
        try {
          await logoutMutation({ refreshToken }).unwrap()
          toast.success('Đăng xuất thành công!', 'Bạn đã đăng xuất khỏi hệ thống')
        } catch (error) {
          // Even if logout API fails, we still proceed with local logout
          console.warn('Logout API call failed:', error)
          toast.warning('Đăng xuất', 'Đã đăng xuất khỏi thiết bị này')
        }
      } else {
        toast.info('Đăng xuất', 'Đã đăng xuất khỏi thiết bị này')
      }
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('Lỗi đăng xuất', 'Đã xảy ra lỗi khi đăng xuất')
    } finally {
      // Always clear local storage and state
      await StorageService.clearAuthData()
      setUser(null)
      hasRedirected.current = false // Reset redirect flag on logout

      // Redirect to marketing page
      router.push('/')
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refreshUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
