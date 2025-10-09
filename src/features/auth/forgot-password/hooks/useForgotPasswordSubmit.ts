"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/services/auth/auth.service";
import { useToast } from "@/hooks/useToast";

export const useForgotPasswordSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const toast = useToast();

  const submitForgotPassword = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      
      const result = await forgotPasswordMutation({
        email: data.email,
      }).unwrap() as any;

      if (result.success) {
        toast.success("Email đặt lại mật khẩu đã được gửi!", "Vui lòng kiểm tra hộp thư của bạn");
        router.push("/forgot-password/success");
      } else {
        toast.error("Gửi email thất bại", result.message || "Không thể gửi email đặt lại mật khẩu");
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      
      // Handle different error types
      if (error?.data?.message) {
        toast.error("Lỗi xảy ra", error.data.message);
      } else if (error?.status === 404) {
        toast.error("Email không tồn tại", "Vui lòng kiểm tra lại địa chỉ email của bạn");
      } else if (error?.status === 400) {
        toast.error("Địa chỉ email không hợp lệ", "Vui lòng nhập địa chỉ email đúng định dạng");
      } else {
        toast.error("Lỗi không xác định", "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitForgotPassword,
    isLoading,
  };
};