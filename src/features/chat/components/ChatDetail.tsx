'use client'

import React, { useRef, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import type { VendorChatConversation, VendorChatMessage } from '../types'
import { VendorChatMessages, VendorChatMessagesRef } from './VendorChatMessages'
import { VendorChatInput, VendorChatInputRef } from './VendorChatInput'

interface ChatDetailProps {
  conversation: VendorChatConversation | null
  messages: VendorChatMessage[]
  currentUserId: string
  inputValue: string
  isLoading: boolean
  onBack?: () => void
  onInputChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  showBackButton?: boolean
}

export const ChatDetail: React.FC<ChatDetailProps> = ({
  conversation,
  messages,
  currentUserId,
  inputValue,
  isLoading,
  onBack,
  onInputChange,
  onSend,
  onKeyPress,
  showBackButton = false,
}) => {
  const { colors } = useTheme()
  const messagesRef = useRef<VendorChatMessagesRef>(null)
  const inputRef = useRef<VendorChatInputRef>(null)

  useEffect(() => {
    if (messages.length > 0) {
      messagesRef.current?.scrollToBottom()
    }
  }, [messages])

  if (!conversation) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-0 min-w-0">
        <div className="text-center px-4">
          <p className="text-lg mb-2 font-medium" style={{ color: colors.text }}>
            Chọn một cuộc trò chuyện để bắt đầu
          </p>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Hoặc tìm kiếm cuộc trò chuyện từ danh sách
          </p>
        </div>
      </div>
    )
  }

  const otherPartyName = currentUserId === conversation.userId
    ? 'User'
    : conversation.vendorName

  return (
    <div className="h-full w-full flex flex-col min-h-0 min-w-0">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border + '30',
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h2 className="text-lg font-semibold truncate" style={{ color: colors.text }}>
            {otherPartyName}
          </h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0">
        <VendorChatMessages
          ref={messagesRef}
          messages={messages}
          isLoading={isLoading}
          currentUserId={currentUserId}
        />
      </div>

      {/* Input */}
      <VendorChatInput
        ref={inputRef}
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        onKeyPress={onKeyPress}
        isLoading={isLoading}
        isOpen={true}
      />
    </div>
  )
}

