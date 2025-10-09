"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/services/auth/auth.service";
import { useToast } from "@/hooks/useToast";

export const useResetPasswordSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [resetPasswordMutation] = useResetPasswordMutation();
  const toast = useToast();

  const submitResetPassword = async (data: { 
    token: string; 
    newPassword: string; 
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);

      // Validate password confirmation
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Mật khẩu không khớp", "Vui lòng nhập lại mật khẩu xác nhận");
        return;
      }

      // Validate password length
      if (data.newPassword.length < 6) {
        toast.error("Mật khẩu quá ngắn", "Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }
      
      const result = await resetPasswordMutation({
        token: data.token,
        newPassword: data.newPassword,
      }).unwrap() as any;

      if (result.success) {
        toast.success("Đặt lại mật khẩu thành công!", "Bạn có thể đăng nhập với mật khẩu mới");
        router.push("/login?message=password-reset-success");
      } else {
        toast.error("Đặt lại mật khẩu thất bại", result.message || "Không thể đặt lại mật khẩu");
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
      
      // Handle different error types
      if (error?.data?.message) {
        toast.error("Lỗi xảy ra", error.data.message);
      } else if (error?.status === 400) {
        toast.error("Token không hợp lệ", "Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ");
      } else if (error?.status === 404) {
        toast.error("Token không tìm thấy", "Liên kết đặt lại mật khẩu không tồn tại");
      } else {
        toast.error("Lỗi không xác định", "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitResetPassword,
    isLoading,
  };
};
