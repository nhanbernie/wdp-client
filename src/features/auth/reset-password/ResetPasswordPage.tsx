"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/form/auth/AuthForm";
import { useResetPasswordSubmit, useVerifyResetToken } from "./hooks";
import { Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const ResetPasswordPage = () => {
  const { colors } = useTheme();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const { submitResetPassword, isLoading } = useResetPasswordSubmit();
  const { isValidToken, userEmail, isLoading: isVerifying } = useVerifyResetToken(token);

  const handleResetPassword = async (data: { token: string; password: string; confirmPassword: string }) => {
    await submitResetPassword(data);
  };

  // Show loading state while verifying token
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.accent }}></div>
          <p style={{ color: colors.textSecondary }}>Đang xác thực liên kết đặt lại...</p>
        </motion.div>
      </div>
    );
  }

  // Show error state if token is invalid
  if (isValidToken === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full min-w-[420px] max-w-md rounded-2xl shadow-xl p-8 border-0 text-center"
          style={{
            backgroundColor: colors.cardBackground,
          }}
        >
          <div className="mb-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: colors.error || "#ef4444" }}
            >
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              Liên kết không hợp lệ
            </h2>
            
            <p style={{ color: colors.textSecondary }} className="mb-6">
              Liên kết đặt lại mật khẩu này không hợp lệ hoặc đã hết hạn.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={() => window.location.href = "/forgot-password"}
                className="w-full relative overflow-hidden group font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentSecondary})`,
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  fontSize: '16px',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Animated background effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  }}
                />
                
                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Yêu cầu liên kết mới</span>
                </div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show reset password form if token is valid
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
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: colors.accent }}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>
          
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: colors.text }}
          >
            Đặt lại mật khẩu
          </h2>
          
          <p style={{ color: colors.textSecondary }} className="mb-2">
            Nhập mật khẩu mới cho
          </p>
          
          {userEmail && (
            <p style={{ color: colors.text }} className="font-medium">
              {userEmail}
            </p>
          )}
        </div>

        <AuthForm 
          type="resetPassword" 
          onSubmit={handleResetPassword}
          token={token}
        />
      </motion.div>
    </div>
  );
};
