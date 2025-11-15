export interface VendorChatMessage {
  id: string
  content: string
  senderId: string
  senderName: string
  senderAvatar?: string
  receiverId: string
  timestamp: Date
  isRead: boolean
  type?: 'text' | 'image' | 'product'
  productId?: string
  imageUrl?: string
}

export interface VendorChatConversation {
  id: string
  vendorId: string
  vendorName: string
  vendorAvatar?: string
  userId: string
  lastMessage?: VendorChatMessage
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

