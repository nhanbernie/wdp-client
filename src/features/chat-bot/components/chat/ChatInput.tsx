'use client'

import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import { motion } from 'motion/react'
import { Send } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  isLoading: boolean
  isOpen?: boolean
}

export interface ChatInputRef {
  focus: () => void
}

export const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  function ChatInput({ value, onChange, onSend, onKeyPress, isLoading, isOpen }, ref) {
    const { theme, colors } = useTheme()
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      },
    }))

    useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      }
    }, [isOpen])

    return (
      <div
        className="p-4"
        style={{
          backgroundColor: colors.cardBackground,
          boxShadow:
            theme === 'dark' ? '0 -4px 12px rgba(0, 0, 0, 0.3)' : '0 -4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-4 py-2 rounded-xl outline-none transition-all"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              color: colors.text,
            }}
            disabled={isLoading}
          />
          <motion.button
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            className="p-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: colors.accent,
              color: '#fff',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    )
  },
)
