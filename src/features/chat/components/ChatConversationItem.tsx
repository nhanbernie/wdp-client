'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Store, User } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import type { VendorChatConversation } from '../types'

interface ChatConversationItemProps {
  conversation: VendorChatConversation
  isSelected: boolean
  onClick: () => void
  currentUserId: string
}

export const ChatConversationItem: React.FC<ChatConversationItemProps> = ({
  conversation,
  isSelected,
  onClick,
  currentUserId,
}) => {
  const { colors } = useTheme()

  // Determine other party based on current user
  // If current user is the user in conversation, show vendor info
  // If current user is vendor, show user info
  const isCurrentUserVendor = currentUserId === conversation.vendorId
  const otherPartyName = isCurrentUserVendor 
    ? (conversation.userName || 'User') // Current user is vendor, show user name
    : conversation.vendorName // Current user is user, show vendor name
  const otherPartyAvatar = isCurrentUserVendor ? conversation.userAvatar : conversation.vendorAvatar

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Vừa xong'
    if (diffMins < 60) return `${diffMins} phút`
    if (diffHours < 24) return `${diffHours} giờ`
    if (diffDays < 7) return `${diffDays} ngày`
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
  }

  return (
    <motion.button
      onClick={onClick}
      className="w-full px-3 py-2.5 transition-all text-left"
      style={{
        backgroundColor: isSelected ? colors.accent + '10' : 'transparent',
      }}
      whileHover={{
        backgroundColor: isSelected
          ? colors.accent + '15'
          : colors.cardBackgroundSecondary,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {otherPartyAvatar ? (
            <Image
              src={otherPartyAvatar}
              alt={otherPartyName}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          ) : (
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: colors.accent + '20',
                color: colors.accent,
              }}
            >
              {isCurrentUserVendor ? <User className="w-7 h-7" /> : <Store className="w-7 h-7" />}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <div className="flex items-center justify-between gap-2">
            <h3
              className="font-semibold text-sm truncate"
              style={{ color: colors.text }}
            >
              {otherPartyName}
            </h3>
            {conversation.lastMessage && (
              <span
                className="text-xs flex-shrink-0 whitespace-nowrap"
                style={{ color: colors.textSecondary }}
              >
                {formatRelativeTime(conversation.lastMessage.timestamp)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {conversation.lastMessage && (
              <>
                <p
                  className="text-sm truncate flex-1 min-w-0"
                  style={{
                    color: conversation.unreadCount > 0 ? colors.text : colors.textSecondary,
                    fontWeight: conversation.unreadCount > 0 ? 600 : 400,
                  }}
                >
                  {conversation.lastMessage.senderId === currentUserId && 'Bạn: '}
                  {conversation.lastMessage.content}
                </p>
                {conversation.unreadCount > 0 && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: colors.error,
                      color: '#fff',
                    }}
                  >
                    {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

