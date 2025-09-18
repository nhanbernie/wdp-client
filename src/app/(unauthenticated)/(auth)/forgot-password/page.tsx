"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import AuthForm from "@/components/form/auth/AuthForm";

export default function ForgotPasswordPage() {
  const { colors } = useTheme();

  const handleForgotPassword = async (data: { email: string }) => {
    try {
      console.log("Forgot password data:", data);
      // TODO: Implement forgot password logic with Redux
    } catch (error) {
      console.error("Forgot password failed:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl shadow-xl p-8 border"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <div className="text-center mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: colors.text }}
          >
            Reset Password
          </h2>
          <p style={{ color: colors.textSecondary }}>
            Enter your email to receive reset instructions
          </p>
        </div>

        <AuthForm type="forgotPassword" onSubmit={handleForgotPassword} />
      </motion.div>
    </div>
  );
}
