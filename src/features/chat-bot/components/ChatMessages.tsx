'use client'

import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Message } from '../types'
import { ChatMessage } from './ChatMessage'
import { LoadingIndicator } from './LoadingIndicator'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  isDragOver: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

export interface ChatMessagesRef {
  scrollToBottom: () => void
}

export const ChatMessages = forwardRef<ChatMessagesRef, ChatMessagesProps>(
  function ChatMessages({ messages, isLoading, isDragOver, onDragOver, onDragLeave, onDrop }, ref) {
    const { colors } = useTheme()
    const chatAreaRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      scrollToBottom: () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      },
    }))

    return (
      <div
        ref={chatAreaRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 transition-all"
        style={{
          backgroundColor: colors.background,
          border: isDragOver ? `2px dashed ${colors.accent}` : '2px dashed transparent',
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    )
  },
)
