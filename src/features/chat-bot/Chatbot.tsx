'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ProductDto } from '@/services/api/product.type'
import { Message } from './types'
import { ChatbotButton } from './components/chat/ChatbotButton'
import { ChatWindow, ChatWindowRef } from './components/chat/ChatWindow'

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
      let response = ''
      if (onSendMessage) {
        response = await onSendMessage(userMessage.content)
      } else {
        // Mock response for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        response =
          'Cảm ơn bạn đã liên hệ! Đây là phản hồi từ AI Assistant. Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.'
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
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
