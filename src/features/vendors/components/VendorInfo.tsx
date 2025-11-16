'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { VendorCard } from './VendorCard'
import { VendorProductsGrid } from './VendorProductsGrid'
import { useVendorProfile } from '../hooks/useVendorProfile'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { useCreateConversationMutation } from '@/services/chat/chat.service'
import { useToast } from '@/hooks/useToast'

interface Props {
  vendorId: string
  vendorName?: string
}

export const VendorInfo: React.FC<Props> = ({ vendorId, vendorName }) => {
  const { profile, products, loading } = useVendorProfile(vendorId)
  const { colors } = useTheme()
  const router = useRouter()
  const { user } = useAuth()
  const [createConversation, { isLoading: isCreatingConversation }] = useCreateConversationMutation()
  const toast = useToast()

  const handleViewShop = () => {
    router.push(`/vendors/${vendorId}`)
  }

  const handleChat = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để chat')
      router.push('/login')
      return
    }

    try {
      // Gọi API POST /api/chat/conversations để tạo conversation trước
      const result = await createConversation({ vendorId }).unwrap()
      
      if (result.success && result.data) {
        // Navigate đến chat page với conversationId từ response
        router.push(`/chat?vendorId=${vendorId}&conversationId=${result.data.id}`)
      } else {
        toast.error(result.message || 'Không thể tạo cuộc trò chuyện')
        // Fallback: vẫn navigate nếu có lỗi
        router.push(`/chat?vendorId=${vendorId}`)
      }
    } catch (error: any) {
      console.error('Failed to create conversation:', error)
      
      // Nếu lỗi 409 (conversation đã tồn tại) hoặc lỗi khác, vẫn navigate
      if (error?.status === 409 || error?.data?.statusCode === 409) {
        // Conversation đã tồn tại, navigate với vendorId để tìm conversation cũ
        router.push(`/chat?vendorId=${vendorId}`)
      } else {
        toast.error(error?.data?.message || 'Không thể tạo cuộc trò chuyện. Vui lòng thử lại.')
        // Fallback: vẫn navigate nếu có lỗi
        router.push(`/chat?vendorId=${vendorId}`)
      }
    }
  }

  // Show loading skeleton
  if (loading) {
    return (
      <section aria-label="vendor-info" className="mt-8">
        <div
          className="rounded-2xl p-6 animate-pulse"
          style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.border}` }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-lg"
              style={{ backgroundColor: colors.cardBackgroundSecondary }}
            />
            <div className="flex-1 space-y-3">
              <div
                className="h-6 rounded"
                style={{ backgroundColor: colors.cardBackgroundSecondary, width: '40%' }}
              />
              <div
                className="h-4 rounded"
                style={{ backgroundColor: colors.cardBackgroundSecondary, width: '60%' }}
              />
              <div className="flex gap-3">
                <div
                  className="h-10 rounded-lg"
                  style={{ backgroundColor: colors.cardBackgroundSecondary, width: '100px' }}
                />
                <div
                  className="h-10 rounded-lg"
                  style={{ backgroundColor: colors.cardBackgroundSecondary, width: '100px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!profile) {
    return null
  }


  return (
    <section aria-label="vendor-info" className="mt-8 mb-9">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        Thông tin người bán
      </h2>

      <VendorCard
        profile={{ ...profile, businessName: vendorName || profile.businessName }}
        onViewShop={handleViewShop}
        onChat={handleChat}
      />
    </section>
  )
}
