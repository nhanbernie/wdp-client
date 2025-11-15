import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
}

export interface SendMessageResponse {
  success: boolean;
  data: {
    message: string;
    conversationId: string;
  };
  message?: string;
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

export interface GetConversationsResponse {
  success: boolean;
  data: ConversationResponseDto[];
  message?: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chat", "Conversations"],
  endpoints: (builder) => ({
    // Send message to chatbot
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (data) => ({
        url: "/chat/message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    // Get conversation history
    getConversation: builder.query<{ success: boolean; data: ChatMessage[] }, string>({
      query: (conversationId) => ({
        url: `/chat/conversation/${conversationId}`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    // Create new conversation
    createConversation: builder.mutation<
      { success: boolean; data: { conversationId: string } },
      void
    >({
      query: () => ({
        url: "/chat/conversation",
        method: "POST",
      }),
      invalidatesTags: ["Chat"],
    }),

    // Get all conversations (vendor chat)
    getConversations: builder.query<GetConversationsResponse, void>({
      query: () => ({
        url: "/api/chat/conversations",
        method: "GET",
      }),
      providesTags: ["Conversations"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationQuery,
  useCreateConversationMutation,
  useGetConversationsQuery,
} = chatApi;

