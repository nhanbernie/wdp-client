'use client'

import React from 'react'
import { X, Store } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

interface VendorChatHeaderProps {
  vendorName: string
  vendorAvatar?: string
  isOnline?: boolean
  onClose: () => void
}

export const VendorChatHeader: React.FC<VendorChatHeaderProps> = ({
  vendorName,
  vendorAvatar,
  isOnline = false,
  onClose,
}) => {
  const { colors } = useTheme()

  return (
    <div
      className="flex items-center justify-between p-4 border-b"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border + '30',
      }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          {vendorAvatar ? (
            <Image
              src={vendorAvatar}
              alt={vendorName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: colors.accent + '20',
                color: colors.accent,
              }}
            >
              <Store className="w-5 h-5" />
            </div>
          )}
          {isOnline && (
            <div
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
              style={{
                backgroundColor: '#10b981',
                borderColor: colors.cardBackground,
              }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate" style={{ color: colors.text }}>
            {vendorName}
          </h3>
          <p className="text-xs truncate" style={{ color: colors.textSecondary }}>
            {isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-lg hover:opacity-70 transition-opacity flex-shrink-0"
        style={{ color: colors.textSecondary }}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}

