"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check localStorage for token
      const token = localStorage.getItem("auth_token");
      const userData = localStorage.getItem("user_data");

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      // Clear invalid data
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Mock login - replace with actual API call
      if (email === "admin@example.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          email: email,
          name: "Admin User",
          role: "admin",
          avatar: undefined,
        };

        // Store in localStorage
        localStorage.setItem("auth_token", "mock_token_123");
        localStorage.setItem("user_data", JSON.stringify(mockUser));

        setUser(mockUser);

        // Redirect based on role
        if (mockUser.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    // Clear state
    setUser(null);

    // Redirect to marketing page
    router.push("/marketing");
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);

      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: Date.now().toString(),
        email: email,
        name: name,
        role: "user",
        avatar: undefined,
      };

      // Store in localStorage
      localStorage.setItem("auth_token", "mock_token_" + Date.now());
      localStorage.setItem("user_data", JSON.stringify(mockUser));

      setUser(mockUser);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
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
