'use client'

import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import type { VendorChatMessage } from '../types'
import { VendorChatMessage as VendorChatMessageComponent } from './VendorChatMessage'
import { Loader2 } from 'lucide-react'

interface VendorChatMessagesProps {
  messages: VendorChatMessage[]
  isLoading: boolean
  currentUserId?: string
}

export interface VendorChatMessagesRef {
  scrollToBottom: () => void
}

export const VendorChatMessages = forwardRef<VendorChatMessagesRef, VendorChatMessagesProps>(
  function VendorChatMessages({ messages, isLoading, currentUserId }, ref) {
    const { colors } = useTheme()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      scrollToBottom: () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      },
    }))

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundColor: colors.background,
        }}
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
            </p>
          </div>
        )}

        {messages.map((message) => (
          <VendorChatMessageComponent
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUserId}
          />
        ))}

        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: colors.accent }} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    )
  },
)

