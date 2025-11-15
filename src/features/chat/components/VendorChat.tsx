'use client'

import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '@/contexts/ThemeContext'
import { useVendorChat } from '../hooks/useVendorChat'
import { VendorChatHeader } from './VendorChatHeader'
import { VendorChatMessages, VendorChatMessagesRef } from './VendorChatMessages'
import { VendorChatInput, VendorChatInputRef } from './VendorChatInput'

interface VendorChatProps {
  vendorId: string
  vendorName: string
  vendorAvatar?: string
  currentUserId?: string
  currentUserName?: string
  currentUserAvatar?: string
  isOpen: boolean
  onClose: () => void
}

export const VendorChat: React.FC<VendorChatProps> = ({
  vendorId,
  vendorName,
  vendorAvatar,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  isOpen,
  onClose,
}) => {
  const { theme, colors } = useTheme()
  const messagesRef = useRef<VendorChatMessagesRef>(null)
  const inputRef = useRef<VendorChatInputRef>(null)

  const {
    messages,
    inputValue,
    isLoading,
    isOnline,
    setInputValue,
    handleSend,
    handleKeyPress,
  } = useVendorChat({
    vendorId,
    vendorName,
    vendorAvatar,
    currentUserId,
    currentUserName,
    currentUserAvatar,
  })

  // Close handler
  const handleClose = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-6 z-50 w-96 h-[600px] rounded-2xl flex flex-col overflow-hidden border"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border + '30',
            boxShadow:
              theme === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 20px 60px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <VendorChatHeader
            vendorName={vendorName}
            vendorAvatar={vendorAvatar}
            isOnline={isOnline}
            onClose={handleClose}
          />
          <VendorChatMessages
            ref={messagesRef}
            messages={messages}
            isLoading={isLoading}
            currentUserId={currentUserId}
          />
          <VendorChatInput
            ref={inputRef}
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
            isOpen={isOpen}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

