'use client'

import React from 'react'
import { Store, Shield, Star, Package, TrendingUp, MessageCircle, Mail } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface VendorProfile {
  businessName: string
  businessEmail?: string
}

interface Props {
  profile: VendorProfile
  totalProducts: number
  totalCategories: number
  onChatNow: () => void
}

export const VendorProfileCard: React.FC<Props> = ({
  profile,
  totalProducts,
  totalCategories,
  onChatNow,
}) => {
  const { colors } = useTheme()

  return (
    <div
      className="rounded-2xl p-8 mb-8"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
        border: `1px solid ${colors.border}30`,
        boxShadow: `0 4px 12px ${colors.border}20`,
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <div
            className="w-[120px] h-[120px] rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
          >
            <Store size={48} style={{ color: colors.accent }} />
          </div>
        </div>

        {/* Middle: Info */}
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-4">
            <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
              {profile.businessName}
            </h1>
            <Shield size={24} style={{ color: colors.success }} />
          </div>

          {profile.businessEmail && (
            <p className="mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
              Email: {profile.businessEmail}
            </p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: colors.cardBackgroundSecondary }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Star size={16} style={{ color: colors.accent }} />
                <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Đánh giá
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold" style={{ color: colors.text }}>
                  N/A
                </span>
              </div>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: colors.cardBackgroundSecondary }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Package size={16} style={{ color: colors.accent }} />
                <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Sản phẩm
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.text }}>
                {totalProducts}
              </span>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: colors.cardBackgroundSecondary }}
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} style={{ color: colors.accent }} />
                <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Đã bán
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.text }}>
                0
              </span>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: colors.cardBackgroundSecondary }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Package size={16} style={{ color: colors.accent }} />
                <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Danh mục
                </span>
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.text }}>
                {totalCategories}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {profile.businessEmail && (
              <div className="flex items-center gap-2">
                <Mail size={16} style={{ color: colors.textSecondary }} />
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  {profile.businessEmail}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Package size={16} style={{ color: colors.textSecondary }} />
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                {totalProducts} sản phẩm
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action button */}
        <div className="flex-shrink-0">
          <button
            onClick={onChatNow}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.accent, color: 'white' }}
          >
            <MessageCircle size={20} />
            Chat Ngay
          </button>
        </div>
      </div>
    </div>
  )
}
