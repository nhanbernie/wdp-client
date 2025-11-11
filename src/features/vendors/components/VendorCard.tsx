'use client'

import React from 'react'
import Image from 'next/image'
import { Store, Star, Package, TrendingUp, Clock, Shield } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { VendorProfileDto } from '../types/vendors.types'

interface Props {
  profile: VendorProfileDto
  onViewShop?: () => void
  onChat?: () => void
}

export const VendorCard: React.FC<Props> = ({ profile, onViewShop, onChat }) => {
  const { colors } = useTheme()

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
        border: `1px solid ${colors.border}30`,
        boxShadow: `0 4px 12px ${colors.border}20`,
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {profile.logo ? (
            <Image
              src={profile.logo}
              alt={profile.businessName}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: colors.cardBackgroundSecondary }}
            >
              <Store size={28} style={{ color: colors.accent }} />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
              {profile.businessName}
            </h3>
            {profile.isVerified && <Shield size={16} style={{ color: colors.success }} />}
          </div>

          <div
            className="flex items-center gap-4 mt-2 text-sm"
            style={{ color: colors.textSecondary }}
          >
            <div className="flex items-center gap-1">
              <Star size={14} style={{ color: colors.accent }} />
              <span>{profile.rating?.toFixed(1) || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package size={14} style={{ color: colors.accent }} />
              <span>{profile.totalProducts || 0} sản phẩm</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp size={14} style={{ color: colors.accent }} />
              <span>Đã bán {profile.totalSold || 0}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={onViewShop}
              className="px-4 py-2 rounded-lg font-medium"
              style={{ backgroundColor: colors.accent, color: 'white' }}
            >
              Xem Shop
            </button>
            <button
              onClick={onChat}
              className="px-4 py-2 rounded-lg font-medium border"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Chat Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
