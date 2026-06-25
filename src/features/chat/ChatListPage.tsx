'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import {
  useGetConversationsQuery,
  useGetConversationQuery,
  type ConversationResponseDto,
  type ConversationMessagesResponse,
} from '@/services/chat/chat.service'
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
      const hasVendorRole =
        Array.isArray(user.roles)
          ? user.roles.some((r: any) => String(r).toUpperCase() === 'VENDOR')
          : false
      const isVendor =
        hasVendorRole ||
        (user.role && String(user.role).toUpperCase() === 'VENDOR') ||
        Boolean((user as any).vendorId)
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

  // Determine if current user is a vendor (used for socket join logic)
  const isVendorUser = useMemo(() => {
    if (!user) return false
    const hasVendorRole =
      Array.isArray(user.roles)
        ? user.roles.some((r: any) => String(r).toUpperCase() === 'VENDOR')
        : false
    return (
      hasVendorRole ||
      (user.role && String(user.role).toUpperCase() === 'VENDOR') ||
      Boolean((user as any).vendorId)
    )
  }, [user])

  // Load messages for selected conversation (REST fallback when socket not available)
  const {
    data: conversationMessagesResponse,
    isLoading: isLoadingMessagesFromApi,
  } = useGetConversationQuery(selectedConversation?.id as string, {
    skip: !selectedConversation || !user,
  })

  // Load messages for selected conversation
  const [messages, setMessages] = useState<VendorChatMessage[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [joinedConversationId, setJoinedConversationId] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)

  // Debounce refetch to avoid UI jank
  const refetchDebounceRef = React.useRef<NodeJS.Timeout | null>(null)
  const optimisticIdRef = React.useRef<string | null>(null)

  // Normalize sender/receiver so UI side (me vs them) is stable across roles
  const normalizeMessage = useCallback(
    (msg: VendorChatMessage, conversation: VendorChatConversation | undefined): VendorChatMessage => {
      if (!conversation || !user) return msg
      // Party IDs in conversation (domain IDs)
      const myPartyId = isVendorUser ? conversation.vendorId : conversation.userId
      const otherPartyId = isVendorUser ? conversation.userId : conversation.vendorId
      const senderIsMe = msg.senderId === myPartyId
      return {
        ...msg,
        senderId: senderIsMe ? user.id : msg.senderId,
        receiverId: senderIsMe ? otherPartyId : msg.receiverId ?? otherPartyId,
      }
    },
    [isVendorUser, user],
  )

  // Use chat socket hook để join conversation, nhận messages và gửi messages
  const { isConnected: isSocketConnected, sendMessage: sendSocketMessage } = useChatSocket({
    // Với user thường: vendorId = vendorId của conversation.
    // Với vendor: FE sẽ gửi vendorId = userId của khách để BE map đúng trong WebsocketGateway.
    vendorId: selectedConversation
      ? isVendorUser
        ? selectedConversation.userId
        : selectedConversation.vendorId
      : undefined,
    conversationId: selectedConversation?.id,
    enabled: !!selectedConversation,
    onConversationHistory: (historyMessages) => {
      // Normalize order: oldest -> newest
      const orderedRaw = [...historyMessages].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      )
      const ordered = orderedRaw.map((m) => normalizeMessage(m, selectedConversation || undefined))
      // Keep optimistic message (if any) when server history returns
      setMessages((prev) => {
        const optimistic = optimisticIdRef.current
          ? prev.filter((m) => m.id === optimisticIdRef.current)
          : []
        return [...ordered, ...optimistic]
      })
      setIsLoadingMessages(false)
    },
    onNewMessage: (newMessage) => {
      const normalized = normalizeMessage(newMessage, selectedConversation || undefined)
      setMessages((prev) => {
        // Tránh duplicate messages
        if (prev.some((msg) => msg.id === normalized.id)) {
          return prev
        }
        // Remove optimistic when real message arrives
        if (optimisticIdRef.current) {
          prev = prev.filter((m) => m.id !== optimisticIdRef.current)
          optimisticIdRef.current = null
        }
        const next = [...prev, normalized]
        // Ensure order oldest -> newest
        next.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
        return next
      })

      // Debounce sidebar refresh to reduce jank
      if (refetchDebounceRef.current) clearTimeout(refetchDebounceRef.current)
      refetchDebounceRef.current = setTimeout(() => {
        refetchConversations()
      }, 400)
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

  // Load messages via REST API (chỉ dùng khi không có socket để tránh race)
  useEffect(() => {
    if (!selectedConversation || !user || isSocketConnected) return

    // Đang load từ API
    if (isLoadingMessagesFromApi) {
      setIsLoadingMessages(true)
      return
    }

    const apiMessages = conversationMessagesResponse?.data as ConversationMessagesResponse | undefined
    if (!apiMessages) return

    const mappedMessages: VendorChatMessage[] = apiMessages.map((msg) => {
      const isVendorSender = msg.senderType === 'VENDOR'
      const senderId = msg.senderId
      const senderName = isVendorSender ? selectedConversation.vendorName : user.name
      const senderAvatar = isVendorSender ? selectedConversation.vendorAvatar : (user as any).avatar
      const receiverId = isVendorSender ? selectedConversation.userId : selectedConversation.vendorId

      return normalizeMessage({
        id: msg.id,
        content: msg.message,
        senderId,
        senderName,
        senderAvatar,
        receiverId,
        timestamp: new Date(msg.createdAt),
        isRead: msg.isRead,
        type: 'text',
      }, selectedConversation)
    })

    // Backend trả DESC, cần đảo thành ASC để UI mới nhất ở dưới
    const ordered = [...mappedMessages].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    )

    setMessages(ordered)
    setIsLoadingMessages(false)
  }, [
    conversationMessagesResponse,
    isLoadingMessagesFromApi,
    isSocketConnected,
    selectedConversation,
    user,
    normalizeMessage,
  ])

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
    // Optimistic UI append
    const optimisticId = `optimistic-${Date.now()}`
    optimisticIdRef.current = optimisticId
    const myPartyId = isVendorUser ? selectedConversation.vendorId : selectedConversation.userId
    const otherPartyId = isVendorUser ? selectedConversation.userId : selectedConversation.vendorId
    setMessages((prev) => [
      ...prev,
      normalizeMessage({
        id: optimisticId,
        content,
        senderId: myPartyId, // will be normalized to account id
        senderName: user?.name || 'Me',
        senderAvatar: (user as any)?.avatar,
        receiverId: otherPartyId,
        timestamp: new Date(),
        isRead: false,
        type: 'text',
      }, selectedConversation),
    ])
    const ok = sendSocketMessage(content)
    if (ok) {
      setInputValue('')
    }
    setIsSending(false)
  }, [selectedConversation, inputValue, isSocketConnected, isSending, sendSocketMessage, isVendorUser, normalizeMessage, user])

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

