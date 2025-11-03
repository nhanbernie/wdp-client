"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const ForgotPasswordSuccessPage = () => {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-w-[420px] max-w-md rounded-2xl shadow-xl p-8 border-0 text-center"
        style={{
          backgroundColor: colors.cardBackground,
        }}
      >
        <div className="mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: colors.success || "#10b981" }}
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Kiểm tra email của bạn
          </h2>
          
          <p style={{ color: colors.textSecondary }} className="mb-8">
            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến và thư mục spam.
          </p>

          <div className="space-y-3">
            <Link href="/forgot-password">
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentSecondary})`,
                  color: 'white',
                }}
              >
                Thử lại
              </button>
            </Link>
            
            <Link href="/login">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity py-2"
                style={{ color: colors.textSecondary }}
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại đăng nhập
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
