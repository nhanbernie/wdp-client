import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getConversationsEndpoint,
  createConversationEndpoint,
  sendMessageEndpoint,
  getConversationEndpoint,
} from "./endpoints/index";

// Export types from endpoints
export type { CreateConversationRequest } from "./endpoints/index";
export type { SendMessageRequest, SendMessageResponse } from "./endpoints/index";
export type { ConversationMessagesResponse } from "./endpoints/index";

// Chat Message Types
export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// Vendor Chat Conversation Types
export interface ConversationResponseDto {
  id: string;
  userId: string;
  vendorId: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCountUser: number;
  unreadCountVendor: number;
  createdAt: Date;
  user?: any;
  vendor?: any;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chat", "Conversations"],
  endpoints: (builder) => ({
    getConversations: getConversationsEndpoint(builder),
    createConversation: createConversationEndpoint(builder),
    sendMessage: sendMessageEndpoint(builder),
    getConversation: getConversationEndpoint(builder),
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationQuery,
  useCreateConversationMutation,
  useGetConversationsQuery,
} = chatApi;

