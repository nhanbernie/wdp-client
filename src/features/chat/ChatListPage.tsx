'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { useGetConversationsQuery, type ConversationResponseDto } from '@/services/chat/chat.service'
import type { VendorChatConversation, VendorChatMessage } from './types'
import { ChatConversationList } from './components/ChatConversationList'
import { ChatDetail } from './components/ChatDetail'
import { useChatSocket } from './hooks/useChatSocket'

export const ChatListPage: React.FC = () => {
  const { colors } = useTheme()
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const vendorIdParam = searchParams.get('vendorId')
  const conversationIdParam = searchParams.get('conversationId')
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fetch conversations from API
  const {
    data: conversationsResponse,
    isLoading: isLoadingConversationsFromApi,
    error: conversationsError,
    refetch: refetchConversations,
  } = useGetConversationsQuery(undefined as void, {
    skip: !user, // Skip if user is not authenticated
  })

  // Map API response to VendorChatConversation format
  const conversations = useMemo<VendorChatConversation[]>(() => {
    if (!conversationsResponse?.data || !user) return []

    return conversationsResponse.data.map((conv: ConversationResponseDto): VendorChatConversation => {
      // Determine unread count based on user role
      const isVendor = user.roles?.includes('vendor') || user.role === 'vendor'
      const unreadCount = isVendor ? conv.unreadCountVendor : conv.unreadCountUser

      // Map last message if exists
      let lastMessage: VendorChatMessage | undefined
      if (conv.lastMessage) {
        // Determine sender info
        // Note: lastMessage chỉ là string, không có thông tin sender
        // Tạm thời không thể xác định sender từ lastMessage string
        // Có thể cần API trả về senderId hoặc senderType trong lastMessage
        const senderId = conv.lastMessageAt ? conv.vendorId : conv.userId // Tạm thời đoán dựa trên timestamp
        const senderName = senderId === conv.vendorId
          ? (conv.vendor?.businessName || 'Vendor')
          : (conv.user?.firstName && conv.user?.lastName
            ? `${conv.user.firstName} ${conv.user.lastName}`
            : conv.user?.email?.split('@')[0] || 'User')
        const senderAvatar = senderId === conv.vendorId ? conv.vendor?.logo : conv.user?.avatar

        lastMessage = {
          id: `last-${conv.id}`,
          content: conv.lastMessage,
          senderId,
          senderName,
          senderAvatar,
          receiverId: senderId === conv.vendorId ? conv.userId : conv.vendorId,
          timestamp: conv.lastMessageAt ? new Date(conv.lastMessageAt) : new Date(conv.createdAt),
          isRead: unreadCount === 0,
          type: 'text',
        }
      }

      // Get user name from user object
      const userName = conv.user?.firstName && conv.user?.lastName
        ? `${conv.user.firstName} ${conv.user.lastName}`
        : conv.user?.email?.split('@')[0] || 'User'

      // Get vendor name from vendor object
      const vendorName = conv.vendor?.businessName || 'Vendor'

      return {
        id: conv.id,
        vendorId: conv.vendorId,
        vendorName,
        vendorAvatar: conv.vendor?.logo, // Vendor có thể có logo thay vì avatar
        userId: conv.userId,
        userName,
        userAvatar: conv.user?.avatar, // User có thể có avatar
        lastMessage,
        unreadCount,
        createdAt: new Date(conv.createdAt),
        updatedAt: conv.lastMessageAt ? new Date(conv.lastMessageAt) : new Date(conv.createdAt),
      }
    })
  }, [conversationsResponse, user])

  // Auto-select conversation if conversationId or vendorId is in URL
  useEffect(() => {
    if (isLoadingConversationsFromApi) return

    // Priority 1: Nếu có conversationId trong URL, dùng nó
    if (conversationIdParam) {
      const conversationById = conversations.find((c) => c.id === conversationIdParam)
      if (conversationById) {
        setSelectedConversationId(conversationById.id)
        if (isMobile) {
          setShowDetail(true)
        }
        return
      }
      // Nếu conversationId không tồn tại trong list, vẫn set để load sau
      setSelectedConversationId(conversationIdParam)
      if (isMobile) {
        setShowDetail(true)
      }
      return
    }

    // Priority 2: Nếu có vendorId, tìm conversation với vendor đó
    if (vendorIdParam && conversations.length > 0) {
      const conversationWithVendor = conversations.find((c) => c.vendorId === vendorIdParam)
      if (conversationWithVendor) {
        setSelectedConversationId(conversationWithVendor.id)
        if (isMobile) {
          setShowDetail(true)
        }
      }
    }
  }, [conversationIdParam, vendorIdParam, conversations, isLoadingConversationsFromApi, isMobile])

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId)

  // Load messages for selected conversation
  const [messages, setMessages] = useState<VendorChatMessage[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [joinedConversationId, setJoinedConversationId] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)

  // Use chat socket hook để join conversation, nhận messages và gửi messages
  const { isConnected: isSocketConnected, sendMessage: sendSocketMessage } = useChatSocket({
    vendorId: selectedConversation?.vendorId,
    conversationId: selectedConversation?.id,
    enabled: !!selectedConversation,
    onConversationHistory: (historyMessages) => {
      setMessages(historyMessages)
      setIsLoadingMessages(false)
    },
    onNewMessage: (newMessage) => {
      setMessages((prev) => {
        // Tránh duplicate messages
        if (prev.some((msg) => msg.id === newMessage.id)) {
          return prev
        }
        return [...prev, newMessage]
      })
    },
  })

  // Clear messages và reset state khi chuyển conversation
  useEffect(() => {
    if (!selectedConversation) {
      setMessages([])
      setJoinedConversationId(null)
      setIsLoadingMessages(false)
      return
    }

    // Reset state khi chuyển sang conversation mới
    if (joinedConversationId && joinedConversationId !== selectedConversation.id) {
      setMessages([])
      setJoinedConversationId(null)
      setIsLoadingMessages(true)
    }
  }, [selectedConversation?.id, joinedConversationId])

  // Fallback: Load messages via API nếu socket không hoạt động
  useEffect(() => {
    if (!selectedConversation || !user || isSocketConnected) return

    const loadMessages = async () => {
      setIsLoadingMessages(true)
      try {
        // TODO: Replace with actual API call
        // const response = await chatApi.getConversation(selectedConversation.id)
        // setMessages(response.data)

        // Mock messages (fallback)
        await new Promise((resolve) => setTimeout(resolve, 300))
        const mockMessages: VendorChatMessage[] = [
          {
            id: 'msg-1',
            content: `Xin chào! Tôi là ${selectedConversation.vendorName}. Tôi có thể giúp gì cho bạn?`,
            senderId: selectedConversation.vendorId,
            senderName: selectedConversation.vendorName,
            senderAvatar: selectedConversation.vendorAvatar,
            receiverId: user.id,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
            isRead: true,
            type: 'text',
          },
          {
            id: 'msg-2',
            content: 'Xin chào! Tôi muốn hỏi về sản phẩm...',
            senderId: user.id,
            senderName: user.name,
            senderAvatar: user.avatar,
            receiverId: selectedConversation.vendorId,
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            isRead: true,
            type: 'text',
          },
        ]
        setMessages(mockMessages)
      } catch (error) {
        console.error('Failed to load messages:', error)
      } finally {
        setIsLoadingMessages(false)
      }
    }

    loadMessages()
  }, [selectedConversation, user, isSocketConnected])

  const handleSelectConversation = useCallback((conversationId: string) => {
    setSelectedConversationId(conversationId)
    if (isMobile) {
      setShowDetail(true)
    }
  }, [isMobile])

  const handleSend = useCallback(() => {
    if (!selectedConversation || !inputValue.trim() || !isSocketConnected) return
    if (isSending) return

    const content = inputValue.trim()
    setIsSending(true)
    const ok = sendSocketMessage(content)
    if (ok) {
      setInputValue('')
    }
    setIsSending(false)
  }, [selectedConversation, inputValue, isSocketConnected, isSending, sendSocketMessage])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  if (!user) {
    return null
  }

  return (
    <div className="h-full flex overflow-hidden w-full">
      {/* Sidebar - Conversation List */}
      <div
        className={`w-full lg:w-96 flex-shrink-0 ${
          showDetail && isMobile ? 'hidden' : 'flex'
        }`}
      >
        <ChatConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          currentUserId={user.id}
          onSelectConversation={handleSelectConversation}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isLoading={isLoadingConversationsFromApi}
          error={conversationsError}
        />
      </div>

      {/* Main - Chat Detail */}
      <div
        className={`flex-1 min-h-0 min-w-0 w-full ${
          !selectedConversationId || (isMobile && !showDetail) ? 'hidden lg:flex' : 'flex'
        }`}
      >
        <ChatDetail
          conversation={selectedConversation || null}
          messages={messages}
          currentUserId={user.id}
          inputValue={inputValue}
          isLoading={isLoadingMessages || isSending}
          onBack={() => setShowDetail(false)}
          onInputChange={setInputValue}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          showBackButton={true}
        />
      </div>
    </div>
  )
}

