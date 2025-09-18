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
  text: string;
  headerBlur: string;
  hoverBackground: string;
  hoverText: string;
  cardBackground: string;
  border: string;
  accent: string;
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
    text: "#ffffff",
    headerBlur: "#0606061a",
    hoverBackground: "#ddd",
    hoverText: "#141414",
    cardBackground: "#1a1a1a",
    border: "#333333",
    accent: "#8b5cf6",
  },
  light: {
    background: "#ffffff",
    text: "#1f2937",
    headerBlur: "#ffffff80",
    hoverBackground: "#f3f4f6",
    hoverText: "#1f2937",
    cardBackground: "#ffffff",
    border: "#e5e7eb",
    accent: "#3b82f6",
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
