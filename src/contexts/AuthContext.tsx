"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useLoginMutation,
  useRegisterMutation,
  useProfileQuery,
} from "@/services/auth/auth.service";
import { StorageService } from "@/services/storage/secureStorage.service";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "user";
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUserProfile: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false);
  const router = useRouter();
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const { data: profileData, refetch: refetchProfile } = useProfileQuery(
    undefined,
    {
      skip: !shouldFetchProfile,
    }
  );

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle profile data when it's fetched
  useEffect(() => {
    if (profileData?.success && profileData.data) {
      const { userId, email, roles } = profileData.data;

      // Update user with profile data
      const updatedUser: User = {
        id: userId,
        email: email,
        name: email.split("@")[0], // Use email prefix as name
        role: roles.includes("admin") ? "admin" : "user",
        avatar: undefined,
      };

      // Update user state (no need to store in localStorage)
      setUser(updatedUser);
      setShouldFetchProfile(false); // Reset flag

      // Redirect based on role after profile is loaded
      if (updatedUser.role === "admin") {
        router.push("/admin");
      }
      // else {
      //   router.push("/marketing");
      // }
    }
  }, [profileData, router]);

  const checkAuthStatus = async () => {
    try {
      // Check storage for token only
      const token = await StorageService.getAccessToken();

      if (token) {
        // If token exists, fetch profile to get user data
        setShouldFetchProfile(true);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      // Clear invalid data
      await StorageService.clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  // Method to refresh user profile data
  const refreshUserProfile = async () => {
    setShouldFetchProfile(true);
    await refetchProfile();
  };

  const logout = async () => {
    // Clear storage
    await StorageService.clearAuthData();

    // Clear state
    setUser(null);

    // Redirect to marketing page
    router.push("/marketing");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
