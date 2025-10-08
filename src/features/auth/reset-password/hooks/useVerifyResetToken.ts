"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVerifyResetTokenQuery } from "@/services/auth/auth.service";
import { useToast } from "@/hooks/useToast";

export const useVerifyResetToken = (token: string) => {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const router = useRouter();
  const toast = useToast();

  const { 
    data, 
    error, 
    isLoading, 
    isError 
  } = useVerifyResetTokenQuery(
    { token },
    {
      skip: !token,
    }
  );

  useEffect(() => {
    if (isError) {
      console.error("Token verification error:", error);
      
      if (error && typeof error === 'object' && 'status' in error) {
        if (error.status === 400) {
          toast.error("Token không hợp lệ", "Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ");
        } else if (error.status === 404) {
          toast.error("Token không tìm thấy", "Liên kết đặt lại mật khẩu không tồn tại");
        } else {
          toast.error("Lỗi xác thực", "Không thể xác thực liên kết đặt lại mật khẩu");
        }
      }
      
      setIsValidToken(false);
      // Redirect to forgot password page after a delay
      setTimeout(() => {
        router.push("/forgot-password");
      }, 3000);
    } else if (data) {
      console.log("Token verification response:", data);
      
      const responseData = data as any;
      if (responseData.success && responseData.data) {
        setIsValidToken(true);
        // API trả về user data trực tiếp trong data, không phải data.user
        setUserEmail(responseData.data.email);
       } else {
         setIsValidToken(false);
         toast.error("Token không hợp lệ", "Liên kết đặt lại mật khẩu không hợp lệ");
         setTimeout(() => {
           router.push("/forgot-password");
         }, 3000);
       }
    }
  }, [data, error, isError, router, toast]);

  return {
    isValidToken,
    userEmail,
    isLoading,
    isError,
  };
};
