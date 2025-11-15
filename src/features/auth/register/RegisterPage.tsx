"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import AuthForm from "@/components/form/auth/AuthForm";
import { useRegisterSubmit } from "./hooks/useRegisterSubmit";

export const RegisterPage = () => {
  const themeContext = useTheme();
  const colors = themeContext?.colors;

  // Fallback colors if context is not available
  const fallbackColors = {
    text: '#F2F2F2',
    textSecondary: '#909090',
    cardBackground: '#1a1a1a',
  };

  const safeColors = colors || fallbackColors;

  const { register, isLoading } = useRegisterSubmit();

  const handleRegister = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    await register(data);
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
            Create Account
          </h2>
          <p style={{ color: safeColors.textSecondary }}>
            Join WDP Materials today!
          </p>
        </div>

        <AuthForm type="register" onSubmit={handleRegister} />
      </motion.div>
    </div>
  );
};
