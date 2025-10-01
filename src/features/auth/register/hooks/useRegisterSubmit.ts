"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/services/auth/auth.service";
import { StorageService } from "@/services/storage/secureStorage.service";

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

        // Redirect based on role
        if (userData.roles.includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/login");
        }
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Registration failed:", error);
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
