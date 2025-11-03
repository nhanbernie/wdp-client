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

// Color Palette - Semantic naming for easy scaling
export const COLOR_PALETTE = {
  // Neutral colors - Support bright accents
  // neutralLight: "#F2F2F2", 
  neutralLight: "#f2f2f2",
  neutralMedium: "#909090", // Medium gray for secondary text
  // neutralDark: "#121212", // Dark text/borders
  neutralDark: "#1c1c1c", // Dark text/borders
  neutralBackgroundDark: "#161616", // Dark background
  
  // Accent colors - Bright highlights for key interactions
  accentPrimary: "#F4A800", // Primary accent color
  accentSecondary: "#F56F10", // Secondary accent color
} as const;

export const THEME_COLORS: Record<Theme, ThemeColors> = {
  dark: {
    background: COLOR_PALETTE.neutralBackgroundDark, // #161616
    backgroundGradient:
      `linear-gradient(135deg, ${COLOR_PALETTE.neutralDark} 0%, ${COLOR_PALETTE.neutralBackgroundDark} 50%, #1a1a2e 100%)`,
    text: COLOR_PALETTE.neutralLight, // #F2F2F2
    textSecondary: COLOR_PALETTE.neutralMedium, // #909090
    headerBlur: `${COLOR_PALETTE.neutralBackgroundDark}1a`,
    hoverBackground: "#2a2a2a",
    hoverText: COLOR_PALETTE.neutralLight,
    cardBackground: "#1a1a1a",
    cardBackgroundSecondary: "#262626",
    border: "#333333",
    accent: COLOR_PALETTE.accentPrimary, // #F4A800
    accentSecondary: COLOR_PALETTE.accentSecondary, // #F56F10
    success: "#10b981",
    warning: COLOR_PALETTE.accentPrimary,
    error: "#ef4444",
  },
  light: {
    background: COLOR_PALETTE.neutralLight, // #F2F2F2
    backgroundGradient:
      `linear-gradient(135deg, ${COLOR_PALETTE.neutralLight} 0%, #e2e8f0 50%, #f8fafc 100%)`,
    text: COLOR_PALETTE.neutralDark, // #000000
    textSecondary: COLOR_PALETTE.neutralMedium, // #909090
    headerBlur: `${COLOR_PALETTE.neutralLight}80`,
    hoverBackground: "#e5e5e5",
    hoverText: COLOR_PALETTE.neutralDark,
    cardBackground: "#ffffff",
    cardBackgroundSecondary: "#f9fafb",
    border: COLOR_PALETTE.neutralMedium, // #909090
    accent: COLOR_PALETTE.accentPrimary, // #F4A800
    accentSecondary: COLOR_PALETTE.accentSecondary, // #F56F10
    success: "#059669",
    warning: COLOR_PALETTE.accentPrimary,
    error: "#dc2626",
  },
};

// Brand Colors - Semantic naming
export const BRAND_COLORS = {
  primary: COLOR_PALETTE.accentPrimary, // Primary brand color
  primaryDark: COLOR_PALETTE.accentSecondary, // Darker primary variant
  secondary: COLOR_PALETTE.neutralMedium, // Secondary color
  secondaryDark: COLOR_PALETTE.neutralBackgroundDark, // Darker secondary variant
  accent: COLOR_PALETTE.accentSecondary, // Accent color for key interactions
  accentLight: COLOR_PALETTE.accentPrimary, // Lighter accent variant
  neutral: COLOR_PALETTE.neutralMedium,
  neutralLight: COLOR_PALETTE.neutralLight,
  neutralDark: COLOR_PALETTE.neutralDark,
  neutralBackgroundDark: COLOR_PALETTE.neutralBackgroundDark,
  success: "#059669",
  warning: COLOR_PALETTE.accentPrimary,
  error: "#dc2626",
  // Palette colors for direct access
  palette: COLOR_PALETTE,
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
