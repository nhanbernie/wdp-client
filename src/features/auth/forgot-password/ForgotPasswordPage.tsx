"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import AuthForm from "@/components/form/auth/AuthForm";
import { useForgotPasswordSubmit } from "./hooks/useForgotPasswordSubmit";

export const ForgotPasswordPage = () => {
  const themeContext = useTheme();
  const colors = themeContext?.colors;

  // Fallback colors if context is not available
  const fallbackColors = {
    text: '#F2F2F2',
    textSecondary: '#909090',
    cardBackground: '#1a1a1a',
  };

  const safeColors = colors || fallbackColors;

  const { submitForgotPassword, isLoading } = useForgotPasswordSubmit();

  const handleForgotPassword = async (data: { email: string }) => {
    await submitForgotPassword(data);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-0"
        style={{
          backgroundColor: safeColors.cardBackground,
        }}
      >
        <div className="text-center mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: safeColors.text }}
          >
            Quên mật khẩu
          </h2>
          <p style={{ color: safeColors.textSecondary }}>
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>
        </div>

        <AuthForm type="forgotPassword" onSubmit={handleForgotPassword} />
      </motion.div>
    </div>
  );
};
