'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import type { VendorChatConversation, VendorChatMessage } from './types'
import { ChatConversationList } from './components/ChatConversationList'
import { ChatDetail } from './components/ChatDetail'
import { useVendorChat } from './hooks/useVendorChat'

export const ChatListPage: React.FC = () => {
  const { colors } = useTheme()
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const vendorIdParam = searchParams.get('vendorId')
  const [conversations, setConversations] = useState<VendorChatConversation[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoadingConversations, setIsLoadingConversations] = useState(true)
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

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId)

  // Mock conversations data - Replace with actual API call
  useEffect(() => {
    const loadConversations = async () => {
      setIsLoadingConversations(true)
      try {
        // TODO: Replace with actual API call
        // const response = await chatApi.getConversations()
        // setConversations(response.data)

        // Mock data
        await new Promise((resolve) => setTimeout(resolve, 500))
        const mockConversations: VendorChatConversation[] = [
          {
            id: '1',
            vendorId: 'vendor-1',
            vendorName: 'Công ty TNHH Dụng cụ Việt',
            vendorAvatar: undefined,
            userId: user?.id || 'user-1',
            unreadCount: 2,
            lastMessage: {
              id: 'msg-1',
              content: 'Xin chào! Tôi muốn hỏi về sản phẩm...',
              senderId: 'vendor-1',
              senderName: 'Công ty TNHH Dụng cụ Việt',
              receiverId: user?.id || 'user-1',
              timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
              isRead: false,
              type: 'text',
            },
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            updatedAt: new Date(Date.now() - 1000 * 60 * 30),
          },
          {
            id: '2',
            vendorId: 'vendor-2',
            vendorName: 'Vật liệu xây dựng ABC',
            vendorAvatar: undefined,
            userId: user?.id || 'user-1',
            unreadCount: 0,
            lastMessage: {
              id: 'msg-2',
              content: 'Cảm ơn bạn đã liên hệ!',
              senderId: user?.id || 'user-1',
              senderName: user?.name || 'Bạn',
              receiverId: 'vendor-2',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
              isRead: true,
              type: 'text',
            },
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
          },
        ]
        setConversations(mockConversations)

        // Auto-select conversation if vendorId is in URL
        if (vendorIdParam) {
          const conversationWithVendor = mockConversations.find(
            (c) => c.vendorId === vendorIdParam
          )
          if (conversationWithVendor) {
            setSelectedConversationId(conversationWithVendor.id)
            if (isMobile) {
              setShowDetail(true)
            }
          } else {
            // Create new conversation if not exists
            // TODO: Create conversation via API
            const newConversation: VendorChatConversation = {
              id: `new-${vendorIdParam}`,
              vendorId: vendorIdParam,
              vendorName: 'Vendor',
              userId: user?.id || '',
              unreadCount: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
            setConversations((prev) => [newConversation, ...prev])
            setSelectedConversationId(newConversation.id)
            if (isMobile) {
              setShowDetail(true)
            }
          }
        }
      } catch (error) {
        console.error('Failed to load conversations:', error)
      } finally {
        setIsLoadingConversations(false)
      }
    }

    if (user) {
      loadConversations()
    }
  }, [user, vendorIdParam, isMobile])

  // Load messages for selected conversation
  const [messages, setMessages] = useState<VendorChatMessage[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)

  useEffect(() => {
    if (!selectedConversation || !user) return

    const loadMessages = async () => {
      setIsLoadingMessages(true)
      try {
        // TODO: Replace with actual API call
        // const response = await chatApi.getConversation(selectedConversation.id)
        // setMessages(response.data)

        // Mock messages
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
  }, [selectedConversation, user])

  // Use vendor chat hook for sending messages
  const {
    inputValue,
    isLoading: isSending,
    setInputValue,
    handleSend: sendMessage,
    handleKeyPress,
  } = useVendorChat({
    vendorId: selectedConversation?.vendorId || '',
    vendorName: selectedConversation?.vendorName || '',
    vendorAvatar: selectedConversation?.vendorAvatar,
    currentUserId: user?.id,
    currentUserName: user?.name,
    currentUserAvatar: user?.avatar,
  })

  const handleSelectConversation = useCallback((conversationId: string) => {
    setSelectedConversationId(conversationId)
    if (isMobile) {
      setShowDetail(true)
    }
  }, [isMobile])

  const handleSend = useCallback(async () => {
    if (!selectedConversation) return
    await sendMessage()
    // Reload messages after sending
    // TODO: Use socket.io or polling to get new messages
    setTimeout(() => {
      setMessages((prev) => [...prev])
    }, 500)
  }, [selectedConversation, sendMessage])

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

