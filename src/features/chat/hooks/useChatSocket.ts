'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useSocket } from '@/contexts/SocketContext'
import type { VendorChatMessage } from '../types'

interface UseChatSocketProps {
  vendorId?: string // VendorId để join conversation (theo backend: join_conversation nhận { vendorId })
  conversationId?: string // ConversationId để gửi tin nhắn (send_message)
  onConversationHistory?: (messages: VendorChatMessage[]) => void
  onNewMessage?: (message: VendorChatMessage) => void
  enabled?: boolean
}

//  * 1. Emit 'join_conversation' với { vendorId }
//  * 2. Listen 'conversation_history' -> nhận messages
//  * 3. Listen 'message:new' -> nhận tin nhắn mới
export function useChatSocket({
  vendorId,
  conversationId,
  onConversationHistory,
  onNewMessage,
  enabled = true,
}: UseChatSocketProps) {
  const { socket, isConnected } = useSocket()
  const callbacksRef = useRef({ 
    onConversationHistory,
    onNewMessage,
  })
  const joinedVendorIdRef = useRef<string | null>(null) // Track joined vendorId to avoid duplicate joins
  const isJoiningRef = useRef(false) // Prevent multiple simultaneous joins
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null) // Track reconnect delay

  // Update callbacks ref when they change
  useEffect(() => {
    callbacksRef.current = { 
      onConversationHistory,
      onNewMessage,
    }
  }, [onConversationHistory, onNewMessage])

  // Join conversation - theo backend: emit 'join_conversation' với { vendorId }
  const joinConversation = useCallback(
    (vendorIdToJoin: string) => {
      if (!socket || !isConnected) {
        console.warn('Socket not connected, cannot join conversation')
        return false
      }

      socket.emit('join_conversation', { vendorId: vendorIdToJoin })
      return true
    },
    [socket, isConnected]
  )

  // Listen to conversation_history event (từ backend sau khi join_conversation)
  useEffect(() => {
    if (!socket || !isConnected || !enabled) return

    const handleConversationHistory = (data: { messages: any[] }) => {
      // Map messages từ backend format sang VendorChatMessage[]
      const messages: VendorChatMessage[] = (data.messages || []).map((msg: any) => ({
        id: msg.id,
        content: msg.content || msg.message || '',
        senderId: msg.senderId || msg.userId || '',
        senderName: msg.senderName || msg.sender?.name || msg.user?.name || 'User',
        senderAvatar: msg.senderAvatar || msg.sender?.avatar || msg.user?.avatar,
        receiverId: msg.receiverId || '',
        timestamp: new Date(msg.timestamp || msg.createdAt || Date.now()),
        isRead: msg.isRead || false,
        type: msg.type || 'text',
        productId: msg.productId,
        imageUrl: msg.imageUrl,
      }))
      
      callbacksRef.current.onConversationHistory?.(messages)
    }

    socket.on('conversation_history', handleConversationHistory)

    return () => {
      socket.off('conversation_history', handleConversationHistory)
    }
  }, [socket, isConnected, enabled])

  // Listen to new message events
  useEffect(() => {
    if (!socket || !isConnected || !enabled) return

    const handleNewMessage = (data: any) => {
      console.log('new_message event received:', data)
      // Map message từ backend format sang VendorChatMessage
      const message: VendorChatMessage = {
        id: data.message?.id || data.id,
        content: data.message?.content || data.message?.message || data.content || data.message || '',
        senderId: data.message?.senderId || data.senderId || data.userId || '',
        senderName:
          data.message?.senderName ||
          data.senderName ||
          data.sender?.name ||
          data.user?.name ||
          'User',
        senderAvatar:
          data.message?.senderAvatar ||
          data.senderAvatar ||
          data.sender?.avatar ||
          data.user?.avatar,
        receiverId: data.message?.receiverId || data.receiverId || '',
        timestamp: new Date(
          data.message?.timestamp ||
            data.message?.createdAt ||
            data.timestamp ||
            data.createdAt ||
            Date.now(),
        ),
        isRead: data.message?.isRead ?? data.isRead ?? false,
        type: data.message?.type || data.type || 'text',
        productId: data.message?.productId || data.productId,
        imageUrl: data.message?.imageUrl || data.imageUrl,
      }
      
      console.log('mapped new message:', message)
      callbacksRef.current.onNewMessage?.(message)
    }

    // Backend emit: server.to(`conversation_${conversationId}`).emit('new_message', { message })
    socket.on('new_message', handleNewMessage)

    return () => {
      socket.off('new_message', handleNewMessage)
    }
  }, [socket, isConnected, enabled])

  // Gửi tin nhắn qua socket theo chuẩn backend: send_message
  const sendMessage = useCallback(
    (message: string, attachments: string[] = []) => {
      if (!socket || !isConnected) {
        return false
      }

      const convId = conversationId
      if (!convId) {
        return false
      }

      socket.emit('send_message', {
        conversationId: convId,
        message,
        attachments,
      })

      return true
    },
    [socket, isConnected, conversationId],
  )

  // Auto join conversation khi có vendorId và socket connected
  useEffect(() => {
    // Clear any pending reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (!vendorId || !isConnected || !enabled) {
      // Reset joined vendorId when disabled or disconnected
      if (!enabled || !isConnected) {
        joinedVendorIdRef.current = null
        isJoiningRef.current = false
      }
      return
    }

    // Chỉ join nếu vendorId thay đổi và chưa đang join (tránh join duplicate)
    if (joinedVendorIdRef.current !== vendorId && !isJoiningRef.current) {
      reconnectTimeoutRef.current = setTimeout(() => {
        if (socket && isConnected && vendorId) {
          isJoiningRef.current = true
          joinedVendorIdRef.current = vendorId
          
          // Emit directly instead of calling joinConversation to avoid dependency issues
          socket.emit('join_conversation', { vendorId })
          
          // Reset joining flag sau 2 giây (đủ thời gian để nhận response)
          setTimeout(() => {
            isJoiningRef.current = false
          }, 2000)
        }
      }, 500) // Delay 500ms sau khi socket connected
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }
    }
  }, [vendorId, isConnected, enabled, socket])

  return {
    joinConversation,
    sendMessage,
    isConnected,
  }
}
