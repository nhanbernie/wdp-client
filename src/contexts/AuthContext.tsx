'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
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
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
  refreshUserProfile: () => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false)
  const router = useRouter()
  const [loginMutation] = useLoginMutation()
  const [registerMutation] = useRegisterMutation()
  const [logoutMutation] = useLogoutMutation()
  const toast = useToast()
  const { data: profileData, refetch: refetchProfile } = useProfileQuery(undefined, {
    skip: !shouldFetchProfile,
  })

  useEffect(() => {
    checkAuthStatus()
  }, [])

  useEffect(() => {
    if (profileData?.success && profileData.data) {
      const { userId, email, roles } = profileData.data

      // Determine user role based on roles array
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
        avatar: undefined,
      }

      setUser(updatedUser)
      setShouldFetchProfile(false)

      // Redirect based on role
      if (updatedUser.role === 'admin') {
        router.push('/admin')
      } else if (updatedUser.role === 'vendor') {
        router.push('/vendor')
      } else {
        // Regular user - redirect to categories or stay on current page
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname
          if (currentPath === '/marketing' || currentPath === '/') {
            router.push('/categories')
          }
        }
      }
      // else {
      //   router.push("/marketing");
      // }
    }
  }, [profileData, router])

  const checkAuthStatus = async () => {
    try {
      const token = await StorageService.getAccessToken()

      if (token) {
        setShouldFetchProfile(true)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      // Clear invalid data
      await StorageService.clearAuthData()
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUserProfile = async () => {
    setShouldFetchProfile(true)
    await refetchProfile()
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

      // Redirect to marketing page
      router.push('/marketing')
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
