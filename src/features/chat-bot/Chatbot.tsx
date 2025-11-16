'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ProductDto } from '@/services/api/product.type'
import { Message } from './types'
import { ChatbotButton } from './components/chat/ChatbotButton'
import { ChatWindow, ChatWindowRef } from './components/chat/ChatWindow'
import { useAssistantMutation } from '@/services/ai/ai.service'
import { API_CONFIG, API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { StorageService } from '@/services/storage/secureStorage.service'

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
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  // Local storage keys
  const STORAGE_KEYS = {
    open: 'chatbot:isOpen',
    messages: 'chatbot:messages',
    input: 'chatbot:input',
    productId: 'chatbot:selectedProductId',
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

      const savedProductId = window.localStorage.getItem(STORAGE_KEYS.productId)
      if (savedProductId) setSelectedProductId(savedProductId)
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

  // Persist selected product id
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      if (selectedProductId) {
        window.localStorage.setItem(STORAGE_KEYS.productId, selectedProductId)
      }
    } catch {
      // ignore storage errors
    }
  }, [selectedProductId])

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

        // If has selected product, add a hint turn for LLM/BE to consume
        if (selectedProductId) {
          history.push({
            role: 'user',
            content: `__PRODUCT_ID__=${selectedProductId}`,
          })
        }

        const messageWithToken = selectedProductId
          ? `${userMessage.content}\n__PRODUCT_ID__=${selectedProductId}`
          : userMessage.content

        const res = await assistant({
          message: messageWithToken,
          conversationHistory: history,
        }).unwrap()
        responseText = res.data?.message || res.message || 'Xin lỗi, tôi chưa có câu trả lời.'
        responseAction = (res.data as any)?.action
        responsePayload = (res.data as any)?.data

        // Không auto đặt hàng ở FE. Việc đặt hàng/confirm do BE orchestration xử lý.
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
        setSelectedProductId(product.id)
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

  // Helpers: fetch default address and create order via REST
  const placeOrderWithDefaultAddress = async (productId: string, quantity: number) => {
    try {
      const token = await StorageService.getAccessToken()
      if (!token) return false

      // Get addresses and find default
      const resAddr = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.ADDRESSES.LIST}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      if (!resAddr.ok) return false
      const addrJson = await resAddr.json()
      const addresses = Array.isArray(addrJson?.data) ? addrJson.data : []
      const defaultAddress =
        addresses.find((a: any) => a.isDefault) || addresses[0] || null
      if (!defaultAddress) return false

      // Create order (ship/COD), BE chấp nhận addressId hoặc shipping fields
      const body = {
        items: [{ productId, quantity }],
        paymentMethod: 'cod',
        addressId: defaultAddress.id,
      }

      const resOrder = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.ORDERS.CREATE}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      })
      return resOrder.ok
    } catch {
      return false
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
