// Chat API Endpoints
// All chat-related API calls organized by functionality

// Conversation endpoints - Requires authentication
export { getConversationsEndpoint } from './getConversations'
export { createConversationEndpoint } from './createConversation'
export { sendMessageEndpoint } from './sendMessage'
export { getConversationEndpoint } from './getConversation'
export { getVendorMessagesEndpoint } from './getVendorMessages'
export { getUnreadCountEndpoint } from './getUnreadCount'

// Export types
export type { CreateConversationRequest } from './createConversation'
export type { SendMessageRequest, SendMessageResponse } from './sendMessage'
export type { ConversationMessagesResponse } from './getConversation'
export type { GetVendorMessagesRequest, ChatMessageDto as VendorChatMessageDto } from './getVendorMessages'
export type { UnreadCountResponse } from './getUnreadCount'
