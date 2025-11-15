'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { VendorChatMessage } from '../types'

interface UseVendorChatProps {
  vendorId: string
  vendorName: string
  vendorAvatar?: string
  currentUserId?: string
  currentUserName?: string
  currentUserAvatar?: string
}

export function useVendorChat({
  vendorId,
  vendorName,
  vendorAvatar,
  currentUserId,
  currentUserName = 'Bạn',
  currentUserAvatar,
}: UseVendorChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<VendorChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(false)

  // Initialize with welcome message when opening chat
  const hasInitialized = useRef(false)
  useEffect(() => {
    if (isOpen && messages.length === 0 && !hasInitialized.current) {
      const welcomeMessage: VendorChatMessage = {
        id: 'welcome-' + Date.now(),
        content: `Xin chào! Tôi là ${vendorName}. Tôi có thể giúp gì cho bạn?`,
        senderId: vendorId,
        senderName: vendorName,
        senderAvatar: vendorAvatar,
        receiverId: currentUserId || '',
        timestamp: new Date(),
        isRead: false,
        type: 'text',
      }
      setMessages([welcomeMessage])
      hasInitialized.current = true
    }
    if (!isOpen) {
      hasInitialized.current = false
    }
  }, [isOpen, vendorId, vendorName, vendorAvatar, currentUserId, messages.length])

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading || !currentUserId) return

    const userMessage: VendorChatMessage = {
      id: 'user-' + Date.now(),
      content: inputValue.trim(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderAvatar: currentUserAvatar,
      receiverId: vendorId,
      timestamp: new Date(),
      isRead: false,
      type: 'text',
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call or socket.io
      // For now, simulate vendor response after 1-2 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

      const vendorMessage: VendorChatMessage = {
        id: 'vendor-' + Date.now(),
        content: `Cảm ơn bạn đã liên hệ! ${vendorName} sẽ phản hồi lại sớm nhất có thể.`,
        senderId: vendorId,
        senderName: vendorName,
        senderAvatar: vendorAvatar,
        receiverId: currentUserId,
        timestamp: new Date(),
        isRead: false,
        type: 'text',
      }

      setMessages((prev) => [...prev, vendorMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: VendorChatMessage = {
        id: 'error-' + Date.now(),
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        senderId: vendorId,
        senderName: vendorName,
        senderAvatar: vendorAvatar,
        receiverId: currentUserId,
        timestamp: new Date(),
        isRead: false,
        type: 'text',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [inputValue, isLoading, currentUserId, currentUserName, currentUserAvatar, vendorId, vendorName, vendorAvatar])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  const openChat = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    messages,
    inputValue,
    isLoading,
    isOnline,
    setInputValue,
    handleSend,
    handleKeyPress,
    openChat,
    closeChat,
  }
}

