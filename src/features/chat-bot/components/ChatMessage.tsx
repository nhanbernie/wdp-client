'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Bot, User } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Message } from '../types'
import { ProductMessageCard } from './ProductMessageCard'
import { CartMessageCard } from './CartMessageCard'
import { SearchProductsMessageCard } from './SearchProductsMessageCard'
import { CategoriesMessageCard } from './CategoriesMessageCard'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { colors } = useTheme()
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? 'order-2' : ''
        }`}
        style={{
          backgroundColor: isUser ? colors.accent : colors.cardBackgroundSecondary,
          color: isUser ? '#fff' : colors.accent,
        }}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[80%] ${
          isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
        }`}
        style={{
          backgroundColor: isUser ? colors.accent : colors.cardBackgroundSecondary,
          color: isUser ? '#fff' : colors.text,
        }}
      >
        {message.product ? (
          <ProductMessageCard product={message.product} isUser={isUser} />
        ) : message.action === 'GET_MY_CART' && message.payload ? (
          <div className="space-y-2">
            {!!message.content && (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            )}
            <CartMessageCard payload={message.payload} isUser={isUser} />
          </div>
        ) : message.action === 'SEARCH_PRODUCTS' && message.payload ? (
          <div className="space-y-2">
            {!!message.content && (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            )}
            <SearchProductsMessageCard payload={message.payload} isUser={isUser} />
          </div>
        ) : message.action === 'GET_CATEGORIES' && message.payload ? (
          <div className="space-y-2">
            {!!message.content && (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            )}
            <CategoriesMessageCard payload={message.payload} isUser={isUser} />
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        )}
        <p
          className="text-xs mt-1 opacity-70"
          style={{ color: isUser ? '#fff' : colors.textSecondary }}
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
