"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/form/auth/AuthForm";

export default function RegisterPage() {
  const { colors } = useTheme();
  const { register } = useAuth();

  const handleRegister = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await register(data.email, data.password);
    } catch (error) {
      console.error("Register failed:", error);
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
}
