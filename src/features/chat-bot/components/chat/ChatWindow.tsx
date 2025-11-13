'use client'

import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '@/contexts/ThemeContext'
import { Message } from '../../types'
import { ChatHeader } from './ChatHeader'
import { ChatMessages, ChatMessagesRef } from '../ChatMessages'
import { ChatInput, ChatInputRef } from './ChatInput'

interface ChatWindowProps {
  isOpen: boolean
  messages: Message[]
  isLoading: boolean
  inputValue: string
  isDragOver: boolean
  onClose: () => void
  onInputChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

export interface ChatWindowRef {
  scrollToBottom: () => void
}

export const ChatWindow = React.forwardRef<ChatWindowRef, ChatWindowProps>((props, ref) => {
  const {
    isOpen,
    messages,
    isLoading,
    inputValue,
    isDragOver,
    onClose,
    onInputChange,
    onSend,
    onKeyPress,
    onDragOver,
    onDragLeave,
    onDrop,
  } = props

  const { theme, colors } = useTheme()
  const messagesRef = useRef<ChatMessagesRef>(null)
  const inputRef = useRef<ChatInputRef>(null)

  React.useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      messagesRef.current?.scrollToBottom()
    },
  }))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-24 left-6 z-40 w-96 h-[600px] rounded-2xl flex flex-col overflow-hidden"
          style={{
            backgroundColor: colors.cardBackground,
            boxShadow:
              theme === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 20px 60px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <ChatHeader onClose={onClose} />
          <ChatMessages
            ref={messagesRef}
            messages={messages}
            isLoading={isLoading}
            isDragOver={isDragOver}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          />
          <ChatInput
            ref={inputRef}
            value={inputValue}
            onChange={onInputChange}
            onSend={onSend}
            onKeyPress={onKeyPress}
            isLoading={isLoading}
            isOpen={isOpen}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
})

ChatWindow.displayName = 'ChatWindow'
