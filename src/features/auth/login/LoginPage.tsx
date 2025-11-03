"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import AuthForm from "@/components/form/auth/AuthForm";
import { useLoginSubmit } from "./hooks/useLoginSubmit";

export const LoginPage = () => {
  const { login, isLoading } = useLoginSubmit();
  const { colors } = useTheme();

  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data);
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
            Sign In
          </h2>
          <p style={{ color: colors.textSecondary }}>
            Welcome back to WDP Materials!
          </p>
        </div>

        <AuthForm type="login" onSubmit={handleLogin} />

        {/* Demo Credentials */}
        {/* <div
          className="mt-6 p-4 rounded-lg border"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            borderColor: colors.border,
          }}
        >
          <p
            className="text-xs mb-2 font-medium"
            style={{ color: colors.text }}
          >
            Demo credentials:
          </p>
          <p className="text-xs" style={{ color: colors.textSecondary }}>
            Email: admin@wdpmaterials.com
          </p>
          <p className="text-xs" style={{ color: colors.textSecondary }}>
            Password: password123
          </p>
        </div> */}
      </motion.div>
    </div>
  );
};
