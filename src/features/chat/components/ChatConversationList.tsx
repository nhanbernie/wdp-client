'use client'

import React from 'react'
import { Search, MessageCircle, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import type { VendorChatConversation } from '../types'
import { ChatConversationItem } from './ChatConversationItem'

interface ChatConversationListProps {
  conversations: VendorChatConversation[]
  selectedConversationId?: string
  currentUserId: string
  onSelectConversation: (conversationId: string) => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export const ChatConversationList: React.FC<ChatConversationListProps> = ({
  conversations,
  selectedConversationId,
  currentUserId,
  onSelectConversation,
  searchQuery = '',
  onSearchChange,
}) => {
  const { colors } = useTheme()
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.vendorName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div
      className="h-full w-full lg:w-96 flex flex-col border-r min-h-0 flex-shrink-0"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border + '30',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 border-b flex-shrink-0"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border + '30',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full hover:opacity-70 transition-opacity"
            style={{
              backgroundColor: 'transparent',
              color: colors.textSecondary,
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold" style={{ color: colors.text }}>
            Đoạn chat
          </h2>
        </div>
        {/* Search */}
        {onSearchChange && (
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: colors.textSecondary }}
            />
            <input
              type="text"
              placeholder="Tìm kiếm trên Messenger"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none text-sm"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                color: colors.text,
                border: `1px solid ${colors.border}20`,
              }}
            />
          </div>
        )}
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 px-4">
            <MessageCircle
              className="w-16 h-16 mb-4"
              style={{ color: colors.textSecondary, opacity: 0.5 }}
            />
            <p className="text-sm text-center" style={{ color: colors.textSecondary }}>
              {searchQuery ? 'Không tìm thấy cuộc trò chuyện' : 'Chưa có cuộc trò chuyện nào'}
            </p>
          </div>
        ) : (
          <div>
            {filteredConversations.map((conversation) => (
              <ChatConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={conversation.id === selectedConversationId}
                onClick={() => onSelectConversation(conversation.id)}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

