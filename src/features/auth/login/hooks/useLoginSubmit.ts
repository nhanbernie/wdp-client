'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/services/auth/auth.service'
import { StorageService } from '@/services/storage/secureStorage.service'
import { useToast } from '@/hooks/useToast'
import { useAuth } from '@/contexts/AuthContext'

interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

interface UseLoginSubmitReturn {
  login: (data: LoginCredentials) => Promise<void>
  isLoading: boolean
  error: Error | null
}

export const useLoginSubmit = (): UseLoginSubmitReturn => {
  const router = useRouter()
  const [loginMutation] = useLoginMutation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const toast = useToast()
  const { refreshUserProfile } = useAuth()

  const login = async (data: LoginCredentials): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await loginMutation({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }).unwrap()

      if (response.success && response.data) {
        const { accessToken, refreshToken, user: userData } = response.data

        // Store tokens
        await StorageService.setTokenData(
          {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: 3600, // Default 1 hour
          },
          !!data.rememberMe,
        )

        // Trigger auth context to fetch user profile
        refreshUserProfile()

        toast.success('Đăng nhập thành công!', `Chào mừng ${userData.email}`)

        if (userData.roles.includes('admin')) {
          router.push('/admin')
        } else {
          // dang loi
          router.push('/')
        }
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (err) {
      const error = err as any
      console.error('Login failed:', error)

      const errorMessage = error?.data?.message || error?.message || 'Đăng nhập thất bại'
      toast.error(errorMessage)
      setError(error)
      throw error // Let AuthForm handle the error display if needed
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    isLoading,
    error,
  }
}
