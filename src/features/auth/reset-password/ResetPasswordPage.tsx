"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordSubmit, useVerifyResetToken } from "./hooks";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const ResetPasswordPage = () => {
  const { colors } = useTheme();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const { submitResetPassword, isLoading } = useResetPasswordSubmit();
  const { isValidToken, userEmail, isLoading: isVerifying } = useVerifyResetToken(token);
  
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitResetPassword({
      token,
      ...formData,
    });
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
          <p style={{ color: colors.textSecondary }}>Verifying reset token...</p>
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
          className="w-full min-w-[420px] max-w-md rounded-2xl shadow-xl p-8 border text-center"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
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
              Invalid Reset Link
            </h2>
            
            <p style={{ color: colors.textSecondary }} className="mb-6">
              This password reset link is invalid or has expired.
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
                  <span>Request New Reset Link</span>
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
        className="w-full min-w-[420px] max-w-md rounded-2xl shadow-xl p-8 border"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
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
            Reset Your Password
          </h2>
          
          <p style={{ color: colors.textSecondary }} className="mb-2">
            Enter your new password for
          </p>
          
          {userEmail && (
            <p style={{ color: colors.text }} className="font-medium">
              {userEmail}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="newPassword" style={{ color: colors.text }}>
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                placeholder="Enter your new password"
                required
                minLength={6}
                className="pr-10"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: colors.textSecondary }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-xs space-y-1" style={{ color: colors.textSecondary }}>
              <p>Mật khẩu phải có:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Ít nhất 6 ký tự</li>
                <li>Ít nhất 1 chữ hoa (A-Z)</li>
                <li>Ít nhất 1 số (0-9)</li>
                <li>Ít nhất 1 ký tự đặc biệt (!@#$%^&*)</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" style={{ color: colors.text }}>
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your new password"
                required
                minLength={6}
                className="pr-10"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: colors.textSecondary }}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              type="submit"
              className="w-full relative overflow-hidden group font-semibold"
              disabled={isLoading || !formData.newPassword || !formData.confirmPassword}
              style={{
                background: isLoading || !formData.newPassword || !formData.confirmPassword
                  ? colors.border
                  : `linear-gradient(135deg, ${colors.accent}, ${colors.accentSecondary})`,
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '16px',
                color: 'white',
                boxShadow: isLoading || !formData.newPassword || !formData.confirmPassword
                  ? 'none'
                  : '0 8px 32px rgba(0, 0, 0, 0.3)',
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
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Reset Password</span>
                  </>
                )}
              </div>
            </Button>
          </motion.div>
        </form>

        <div className="mt-6 text-center">
          <p style={{ color: colors.textSecondary }} className="text-sm">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-medium hover:underline"
              style={{ color: colors.accent }}
            >
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
