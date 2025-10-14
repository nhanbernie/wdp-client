'use client'

import { useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useProfileQuery } from '@/services/auth/auth.service'
import { StorageService } from '@/services/storage/secureStorage.service'

export const useRoleGuard = () => {
  const { refreshUserProfile } = useAuth()
  const { refetch: refetchProfile } = useProfileQuery(undefined, {
    skip: true, // Skip automatic fetching, we'll call manually
  })

  const refreshTokenAndProfile = useCallback(async () => {
    try {
      // Get current tokens
      const accessToken = await StorageService.getAccessToken()
      const refreshToken = await StorageService.getRefreshToken()

      if (!accessToken || !refreshToken) {
        console.warn('No tokens found for refresh')
        return false
      }

      // Call profile API to refresh user data
      const result = await refetchProfile()

      if (result.data?.success) {
        // Update user profile in context
        await refreshUserProfile()
        return true
      }

      return false
    } catch (error) {
      console.error('Error refreshing token and profile:', error)
      return false
    }
  }, [refetchProfile, refreshUserProfile])

  const handleVendorUpdateSuccess = useCallback(async () => {
    try {
      // Refresh token and profile after vendor update
      const success = await refreshTokenAndProfile()

      if (success) {
        console.log('Token and profile refreshed successfully')
      } else {
        console.warn('Failed to refresh token and profile')
      }
    } catch (error) {
      console.error('Error in handleVendorUpdateSuccess:', error)
    }
  }, [refreshTokenAndProfile])

  return {
    refreshTokenAndProfile,
    handleVendorUpdateSuccess,
  }
}
