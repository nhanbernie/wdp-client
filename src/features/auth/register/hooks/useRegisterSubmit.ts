"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/services/auth/auth.service";
import { StorageService } from "@/services/storage/secureStorage.service";
import { useToast } from "@/hooks/useToast";

interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

interface UseRegisterSubmitReturn {
  register: (data: RegisterCredentials) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export const useRegisterSubmit = (): UseRegisterSubmitReturn => {
  const router = useRouter();
  const [registerMutation] = useRegisterMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const toast = useToast();

  const register = async (data: RegisterCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Call register API directly
      const response = await registerMutation({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response.success && response.data) {
        const { accessToken, refreshToken, user: userData } = response.data;

        // Store tokens
        await StorageService.setTokenData({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600, // Default 1 hour
        });

        toast.success(
          "Đăng ký thành công!",
          `Chào mừng ${userData.email}. Đang chuyển hướng...`
        );

        // Redirect based on role
        if (userData.roles.includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/login");
        }
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (err: any) {
      const error = err as Error;
      console.error("Registration failed:", error);

      const errorMessage = err?.data?.message || err?.message || "Đăng ký thất bại";
      toast.error("Lỗi đăng ký", errorMessage);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};
