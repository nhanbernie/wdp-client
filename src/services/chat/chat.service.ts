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

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chat"],
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
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationQuery,
  useCreateConversationMutation,
} = chatApi;

