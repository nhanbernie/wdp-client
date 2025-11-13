'use client'

import React from 'react'
import { Bot, Loader2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const LoadingIndicator: React.FC = () => {
  const { colors } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
        }}
      >
        <Bot className="w-4 h-4" style={{ color: colors.accent }} />
      </div>
      <div
        className="px-4 py-2 rounded-2xl rounded-tl-sm"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          color: colors.text,
        }}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    </div>
  )
}
