'use client'

import React from 'react'
import { motion } from 'motion/react'
import { User, Store } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import type { VendorChatMessage as VendorChatMessageType } from '../types'

interface VendorChatMessageProps {
  message: VendorChatMessageType
  isCurrentUser: boolean
}

export const VendorChatMessage: React.FC<VendorChatMessageProps> = ({
  message,
  isCurrentUser,
}) => {
  const { colors } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {message.senderAvatar ? (
          <Image
            src={message.senderAvatar}
            alt={message.senderName}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: isCurrentUser ? colors.accent : colors.cardBackgroundSecondary,
              color: isCurrentUser ? '#fff' : colors.accent,
            }}
          >
            {isCurrentUser ? <User className="w-4 h-4" /> : <Store className="w-4 h-4" />}
          </div>
        )}
      </div>

      {/* Message Content */}
      <div
        className={`flex flex-col gap-1 max-w-[75%] sm:max-w-[60%] ${
          isCurrentUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`px-4 py-2 rounded-2xl ${
            isCurrentUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
          }`}
          style={{
            backgroundColor: isCurrentUser ? colors.accent : colors.cardBackgroundSecondary,
            color: isCurrentUser ? '#fff' : colors.text,
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          {message.type === 'image' && message.imageUrl ? (
            <Image
              src={message.imageUrl}
              alt="Chat image"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap break-words break-all">
              {message.content}
            </p>
          )}
        </div>
        <p
          className="text-xs px-1"
          style={{ color: colors.textSecondary }}
        >
          {message.timestamp.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  )
}

