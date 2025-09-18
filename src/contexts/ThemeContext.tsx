"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Theme = "light" | "dark";

interface ThemeColors {
  background: string;
  backgroundGradient: string;
  text: string;
  textSecondary: string;
  headerBlur: string;
  hoverBackground: string;
  hoverText: string;
  cardBackground: string;
  cardBackgroundSecondary: string;
  border: string;
  accent: string;
  accentSecondary: string;
  success: string;
  warning: string;
  error: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<Theme, ThemeColors> = {
  dark: {
    background: "#060606",
    backgroundGradient:
      "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
    text: "#ffffff",
    textSecondary: "#a1a1aa",
    headerBlur: "#0606061a",
    hoverBackground: "#ddd",
    hoverText: "#141414",
    cardBackground: "#1a1a1a",
    cardBackgroundSecondary: "#262626",
    border: "#333333",
    accent: "#8b5cf6",
    accentSecondary: "#a855f7",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
  },
  light: {
    background: "#ffffff",
    backgroundGradient:
      "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
    text: "#1f2937",
    textSecondary: "#6b7280",
    headerBlur: "#ffffff80",
    hoverBackground: "#f3f4f6",
    hoverText: "#1f2937",
    cardBackground: "#ffffff",
    cardBackgroundSecondary: "#f9fafb",
    border: "#e5e7eb",
    accent: "#3b82f6",
    accentSecondary: "#2563eb",
    success: "#059669",
    warning: "#d97706",
    error: "#dc2626",
  },
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("dark"); // Default to dark

  useEffect(() => {
    // Check localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to dark theme
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
