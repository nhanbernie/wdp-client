'use client'

import React from 'react'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Address } from '@/services/addresses/types'
import { useTheme } from '@/contexts/ThemeContext'
import { DefaultBadge } from './DefaultBadge'

interface AddressDisplayProps {
  address: Address | null
  onChange: () => void
  onManage?: () => void
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({ address, onChange, onManage }) => {
  const { colors } = useTheme()

  if (!address) {
    return (
      <div
        className="p-6 rounded-xl cursor-pointer transition-all hover:shadow-md"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          boxShadow: `0 1px 3px ${colors.border}40`,
        }}
        onClick={onChange}
      >
        <div className="flex items-center justify-center py-10">
          <div className="text-center">
            <MapPin className="w-14 h-14 mx-auto mb-4" style={{ color: colors.textSecondary }} />
            <p className="font-medium text-base mb-2" style={{ color: colors.text }}>
              Chưa có địa chỉ giao hàng
            </p>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Nhấn để thêm địa chỉ mới
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="p-6 rounded-xl transition-all relative"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
        border: `1px solid ${colors.border}30`,
        boxShadow: `0 4px 12px ${colors.border}20`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" style={{ color: colors.textSecondary }} />
          <h3 className="font-semibold text-base" style={{ color: colors.text }}>
            Địa Chỉ Nhận Hàng
          </h3>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onChange}
          style={{
            color: colors.accent,
            padding: '0.25rem 0.5rem',
          }}
          className="hover:bg-transparent hover:underline"
        >
          Thay Đổi
        </Button>
      </div>

      {/* Recipient Info */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <p className="font-semibold text-base" style={{ color: colors.text }}>
            {address.recipientName}
          </p>
          <span style={{ color: colors.textSecondary }}>|</span>
          <p className="font-semibold text-base" style={{ color: colors.text }}>
            {address.recipientPhone}
          </p>
          {address.isDefault && (
            <span className="ml-1">
              <DefaultBadge />
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
          {address.addressLine}
          {address.ward && `, ${address.ward}`}
          {address.district && `, ${address.district}`}
          {address.city && `, ${address.city}`}
        </p>
      </div>
    </div>
  )
}
