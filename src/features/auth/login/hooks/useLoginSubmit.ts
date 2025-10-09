"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/services/auth/auth.service";
import { StorageService } from "@/services/storage/secureStorage.service";

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface UseLoginSubmitReturn {
  login: (data: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export const useLoginSubmit = (): UseLoginSubmitReturn => {
  const router = useRouter();
  const [loginMutation] = useLoginMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (data: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Call login API directly
      const response = await loginMutation({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }).unwrap();

      if (response.success && response.data) {
        const { accessToken, refreshToken, user: userData } = response.data;

        // Store tokens
        await StorageService.setTokenData(
          {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: 3600, // Default 1 hour
          },
          !!data.rememberMe
        );

        // Redirect based on role
        if (userData.roles.includes("admin")) {
          router.push("/admin");
        } else {
            // dang loi
          router.push("/categories");
        }
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Login failed:", error);
      setError(error);
      throw error; // Let AuthForm handle the error display if needed
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};
