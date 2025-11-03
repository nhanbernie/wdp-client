"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import AuthForm from "@/components/form/auth/AuthForm";
import { useForgotPasswordSubmit } from "./hooks/useForgotPasswordSubmit";

export const ForgotPasswordPage = () => {
  const { colors } = useTheme();
  const { submitForgotPassword, isLoading } = useForgotPasswordSubmit();

  const handleForgotPassword = async (data: { email: string }) => {
    await submitForgotPassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-w-[420px] max-w-md rounded-2xl shadow-xl p-8 border-0"
        style={{
          backgroundColor: colors.cardBackground,
        }}
      >
        <div className="text-center mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: colors.text }}
          >
            Quên mật khẩu
          </h2>
          <p style={{ color: colors.textSecondary }}>
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>
        </div>

        <AuthForm type="forgotPassword" onSubmit={handleForgotPassword} />
      </motion.div>
    </div>
  );
};
