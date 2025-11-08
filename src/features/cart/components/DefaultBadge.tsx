'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export const DefaultBadge: React.FC = () => {
  const { colors } = useTheme()

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-xs font-normal rounded-md"
      style={{
        backgroundColor: `${colors.textSecondary}20`,
        color: colors.textSecondary,
        border: `1px solid ${colors.textSecondary}40`,
      }}
    >
      Mặc định
    </span>
  )
}
