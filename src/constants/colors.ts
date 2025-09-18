export interface ThemeColors {
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

export type Theme = "light" | "dark";

export const THEME_COLORS: Record<Theme, ThemeColors> = {
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

// Brand Colors - Construction Materials Theme
export const BRAND_COLORS = {
  primary: "#d97706", // Orange - construction/safety
  primaryDark: "#b45309",
  secondary: "#0369a1", // Blue - trust/reliability
  secondaryDark: "#0c4a6e",
  accent: "#dc2626", // Red - attention/important
  accentLight: "#ef4444",
  neutral: "#6b7280",
  neutralLight: "#9ca3af",
  success: "#059669",
  warning: "#d97706",
  error: "#dc2626",
};

// Construction Materials Specific Colors
export const CONSTRUCTION_COLORS = {
  concrete: "#9ca3af",
  steel: "#374151",
  wood: "#92400e",
  brick: "#dc2626",
  sand: "#fbbf24",
  gravel: "#6b7280",
};
