"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const ForgotPasswordSuccessPage = () => {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-w-[420px] max-w-md rounded-2xl shadow-xl p-8 border text-center"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.success || "#10b981" }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Check Your Email
          </h2>
          
          <p style={{ color: colors.textSecondary }} className="mb-6">
            We've sent password reset instructions to your email address.
          </p>

          <div
            className="flex items-center justify-center p-4 rounded-lg mb-6"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              borderColor: colors.border,
              border: `1px solid ${colors.border}`,
            }}
          >
            <Mail className="w-5 h-5 mr-2" style={{ color: colors.textSecondary }} />
            <span style={{ color: colors.textSecondary }} className="text-sm">
              Please check your inbox and spam folder
            </span>
          </div>

          <div className="space-y-4">
            <p style={{ color: colors.textSecondary }} className="text-sm">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link href="/forgot-password">
                <Button
                  variant="outline"
                  className="w-full"
                  style={{
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                >
                  Try Again
                </Button>
              </Link>
              
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="w-full"
                  style={{ color: colors.textSecondary }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
