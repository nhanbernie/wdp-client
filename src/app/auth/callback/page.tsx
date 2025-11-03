"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/storage/secureStorage.service";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
  const router = useRouter();
  const { refreshUserProfile } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash.substring(1); // Remove #

    if (hash.includes("tokens=")) {
      // Extract tokens from hash fragment
      const tokensParam = hash.split("tokens=")[1].split("&")[0];

      try {
        const tokens = JSON.parse(decodeURIComponent(tokensParam));

        // Save tokens using StorageService
        StorageService.setTokenData(
          {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            expires_in: tokens.expiresIn || 3600,
          },
          true // rememberMe
        ).then(() => {
          // Refresh user profile to update auth context
          refreshUserProfile();

          // If opened in popup, send message to parent window
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(
              {
                type: "GOOGLE_AUTH_SUCCESS",
                tokens: tokens,
              },
              window.location.origin
            );
            window.close();
          } else {
            // Force redirect to home page after successful login
            setTimeout(() => {
              window.location.href = "/";
            }, 100);
          }
        });
      } catch (error) {
        console.error("Failed to parse tokens:", error);
        
        // If opened in popup, send error to parent
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            {
              type: "GOOGLE_AUTH_ERROR",
              error: "Failed to parse tokens",
            },
            window.location.origin
          );
          window.close();
        } else {
          router.push("/login");
        }
      }
    } else if (hash.includes("error=")) {
      // Handle error
      const errorMsg = decodeURIComponent(hash.split("error=")[1].split("&")[0]);

      // If opened in popup, send error to parent
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          {
            type: "GOOGLE_AUTH_ERROR",
            error: errorMsg,
          },
          window.location.origin
        );
        window.close();
      } else {
        router.push(`/login?error=${encodeURIComponent(errorMsg)}`);
      }
    } else {
      // No tokens or error, redirect to login
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(
          {
            type: "GOOGLE_AUTH_ERROR",
            error: "No tokens received",
          },
          window.location.origin
        );
        window.close();
      } else {
        router.push("/login");
      }
    }
  }, [router, refreshUserProfile]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg font-semibold">Đang xử lý đăng nhập...</p>
        <p className="text-sm text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
      </div>
    </div>
  );
}


