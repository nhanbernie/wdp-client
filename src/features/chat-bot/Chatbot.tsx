'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ProductDto } from '@/services/api/product.type'
import { Message } from './types'
import { ChatbotButton } from './components/chat/ChatbotButton'
import { ChatWindow, ChatWindowRef } from './components/chat/ChatWindow'
import { useAssistantMutation } from '@/services/ai/ai.service'

interface ChatbotProps {
  onSendMessage?: (message: string) => Promise<string>
}

export const Chatbot: React.FC<ChatbotProps> = ({ onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const chatWindowRef = useRef<ChatWindowRef>(null)
  const [assistant, { isLoading: isAssistantLoading }] = useAssistantMutation()

  // Local storage keys
  const STORAGE_KEYS = {
    open: 'chatbot:isOpen',
    messages: 'chatbot:messages',
    input: 'chatbot:input',
  }

  // Load persisted state on mount
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return

      const savedOpen = window.localStorage.getItem(STORAGE_KEYS.open)
      if (savedOpen !== null) {
        setIsOpen(savedOpen === '1')
      }

      const savedMessages = window.localStorage.getItem(STORAGE_KEYS.messages)
      if (savedMessages) {
        const parsed: Array<Omit<Message, 'timestamp'> & { timestamp: string }> = JSON.parse(savedMessages)
        const restored: Message[] = parsed.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }))
        if (restored.length > 0) {
          setMessages(restored)
        }
      }

      const savedInput = window.localStorage.getItem(STORAGE_KEYS.input)
      if (savedInput) setInputValue(savedInput)
    } catch {
      // ignore storage errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist messages and open state
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(STORAGE_KEYS.open, isOpen ? '1' : '0')
      const serializable = messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() }))
      window.localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(serializable))
    } catch {
      // ignore storage errors
    }
  }, [isOpen, messages])

  // Persist input value
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(STORAGE_KEYS.input, inputValue)
    } catch {
      // ignore storage errors
    }
  }, [inputValue])

  const scrollToBottom = () => {
    chatWindowRef.current?.scrollToBottom()
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen, messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      let responseText = ''
      let responseAction: string | undefined
      let responsePayload: any | undefined
      if (onSendMessage) {
        responseText = await onSendMessage(userMessage.content)
      } else {
        // Call backend AI assistant
        const history = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }))
        const res = await assistant({
          message: userMessage.content,
          conversationHistory: history,
        }).unwrap()
        responseText = res.data?.message || res.message || 'Xin lỗi, tôi chưa có câu trả lời.'
        responseAction = res.data?.action || res.action
        responsePayload = res.data?.data || res.data
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        action: responseAction,
        payload: responsePayload,
        role: 'assistant',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        role: 'assistant',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    try {
      const productData = e.dataTransfer.getData('application/json')
      if (productData) {
        const product: ProductDto = JSON.parse(productData)

        const productMessage: Message = {
          id: Date.now().toString(),
          content: `Sản phẩm: ${product.name}`,
          role: 'user',
          timestamp: new Date(),
          product: product,
        }

        setMessages((prev) => [...prev, productMessage])
        scrollToBottom()

        // Auto send message with product info
        setTimeout(() => {
          if (onSendMessage) {
            setIsLoading(true)
            onSendMessage(`Tôi muốn hỏi về sản phẩm: ${product.name}`)
              .then((response) => {
                const assistantMessage: Message = {
                  id: (Date.now() + 1).toString(),
                  content: response,
                  role: 'assistant',
                  timestamp: new Date(),
                }
                setMessages((prev) => [...prev, assistantMessage])
              })
              .catch(() => {
                const errorMessage: Message = {
                  id: (Date.now() + 1).toString(),
                  content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
                  role: 'assistant',
                  timestamp: new Date(),
                }
                setMessages((prev) => [...prev, errorMessage])
              })
              .finally(() => {
                setIsLoading(false)
              })
          }
        }, 300)
      }
    } catch (error) {
      console.error('Failed to handle drop:', error)
    }
  }

  return (
    <>
      <ChatbotButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatWindow
        ref={chatWindowRef}
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        inputValue={inputValue}
        isDragOver={isDragOver}
        onClose={() => setIsOpen(false)}
        onInputChange={setInputValue}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
    </>
  )
}
