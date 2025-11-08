"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getNeumorphismShadow } from "@/common/constants/neumorphism";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatbotProps {
  onSendMessage?: (message: string) => Promise<string>;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Xin chào! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, colors } = useTheme();
  const neumorphismShadow = getNeumorphismShadow(theme);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let response = "";
      if (onSendMessage) {
        response = await onSendMessage(userMessage.content);
      } else {
        // Mock response for demo
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = "Cảm ơn bạn đã liên hệ! Đây là phản hồi từ AI Assistant. Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: colors.cardBackground,
          boxShadow: theme === 'dark' 
            ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)' 
            : '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
          color: colors.accent,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 left-6 z-40 w-96 h-[600px] rounded-2xl flex flex-col overflow-hidden"
            style={{
              backgroundColor: colors.cardBackground,
              boxShadow: theme === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 20px 60px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: colors.accent,
                    color: "#fff",
                  }}
                >
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: colors.text }}>
                    AI Assistant
                  </h3>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                style={{ color: colors.textSecondary }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ backgroundColor: colors.background }}
            >
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} theme={theme} colors={colors} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: colors.cardBackgroundSecondary,
                    }}
                  >
                    <Bot className="w-4 h-4" style={{ color: colors.accent }} />
                  </div>
                  <div
                    className="px-4 py-2 rounded-2xl rounded-tl-sm"
                    style={{
                      backgroundColor: colors.cardBackgroundSecondary,
                      color: colors.text,
                    }}
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-4"
              style={{
                backgroundColor: colors.cardBackground,
                boxShadow: theme === 'dark'
                  ? '0 -4px 12px rgba(0, 0, 0, 0.3)'
                  : '0 -4px 12px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-2 rounded-xl outline-none transition-all"
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    color: colors.text,
                  }}
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: colors.accent,
                    color: "#fff",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface ChatMessageProps {
  message: Message;
  theme: "light" | "dark";
  colors: any;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, theme, colors }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? "order-2" : ""
        }`}
        style={{
          backgroundColor: isUser ? colors.accent : colors.cardBackgroundSecondary,
          color: isUser ? "#fff" : colors.accent,
        }}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[80%] ${
          isUser ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
        style={{
          backgroundColor: isUser
            ? colors.accent
            : colors.cardBackgroundSecondary,
          color: isUser ? "#fff" : colors.text,
        }}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p
          className="text-xs mt-1 opacity-70"
          style={{ color: isUser ? "#fff" : colors.textSecondary }}
        >
          {message.timestamp.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
};

