"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useExchangeCodeMutation } from "@/services/auth/auth.service";
import { StorageService } from "@/services/storage/secureStorage.service";

interface GoogleLoginCredentials {
  authCode: string;
  rememberMe?: boolean;
}

interface UseGoogleLoginSubmitReturn {
  googleLogin: (data: GoogleLoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export const useGoogleLoginSubmit = (): UseGoogleLoginSubmitReturn => {
  const router = useRouter();
  const [exchangeCodeMutation] = useExchangeCodeMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const googleLogin = async (data: GoogleLoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Call login API directly
      const response = await exchangeCodeMutation({
        authCode: data.authCode,
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
          router.push("/dashboard");
        }
      } else {
        throw new Error(response.message || "Google Login failed");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Google Login failed:", error);
      setError(error);
      throw error; // Let AuthForm handle the error display if needed
    } finally {
      setIsLoading(false);
    }
  };

  return {
    googleLogin,
    isLoading,
    error,
  };
};
