'use client'

import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import { motion } from 'motion/react'
import { Send, Paperclip, Image as ImageIcon, Mic, Smile } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface VendorChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  isLoading: boolean
  isOpen?: boolean
}

export interface VendorChatInputRef {
  focus: () => void
}

export const VendorChatInput = forwardRef<VendorChatInputRef, VendorChatInputProps>(
  function VendorChatInput({ value, onChange, onSend, onKeyPress, isLoading, isOpen }, ref) {
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
        className="px-4 py-3 border-t flex-shrink-0"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border + '30',
        }}
      >
        <div className="flex items-center gap-2">
          {/* Left Icons */}
          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-full transition-opacity hover:opacity-70 flex-shrink-0"
              style={{
                backgroundColor: 'transparent',
                color: colors.textSecondary,
              }}
              disabled={isLoading}
              title="Đính kèm file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-full transition-opacity hover:opacity-70 flex-shrink-0"
              style={{
                backgroundColor: 'transparent',
                color: colors.textSecondary,
              }}
              disabled={isLoading}
              title="Gửi ảnh"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Aa"
            className="flex-1 px-4 py-2.5 rounded-full outline-none transition-all text-sm"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              color: colors.text,
              border: `1px solid ${colors.border}20`,
            }}
            disabled={isLoading}
          />

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            {!value.trim() ? (
              <>
                <button
                  className="p-2 rounded-full transition-opacity hover:opacity-70 flex-shrink-0"
                  style={{
                    backgroundColor: 'transparent',
                    color: colors.textSecondary,
                  }}
                  disabled={isLoading}
                  title="Emoji"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full transition-opacity hover:opacity-70 flex-shrink-0"
                  style={{
                    backgroundColor: 'transparent',
                    color: colors.textSecondary,
                  }}
                  disabled={isLoading}
                  title="Ghi âm"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </>
            ) : (
              <motion.button
                onClick={onSend}
                disabled={!value.trim() || isLoading}
                className="p-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                style={{
                  backgroundColor: colors.accent,
                  color: '#fff',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Gửi"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    )
  },
)

