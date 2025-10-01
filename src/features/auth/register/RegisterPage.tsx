"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import AuthForm from "@/components/form/auth/AuthForm";
import { useRegisterSubmit } from "./hooks/useRegisterSubmit";

export const RegisterPage = () => {
  const { colors } = useTheme();
  const { register, isLoading } = useRegisterSubmit();

  const handleRegister = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    await register(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-w-[420px] max-w-md rounded-2xl shadow-xl p-8 border"
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
            Create Account
          </h2>
          <p style={{ color: colors.textSecondary }}>
            Join WDP Materials today!
          </p>
        </div>

        <AuthForm type="register" onSubmit={handleRegister} />
      </motion.div>
    </div>
  );
};
