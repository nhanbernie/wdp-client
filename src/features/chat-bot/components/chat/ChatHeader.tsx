'use client'

import React from 'react'
import { Bot, X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface ChatHeaderProps {
  onClose: () => void
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  const { colors } = useTheme()

  return (
    <div
      className="flex items-center justify-between p-4"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: colors.accent,
            color: '#fff',
          }}
        >
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: colors.text }}>
            AI Assistant
          </h3>
          <p className="text-xs" style={{ color: colors.textSecondary }}>
            Online
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-lg hover:opacity-70 transition-opacity"
        style={{ color: colors.textSecondary }}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
