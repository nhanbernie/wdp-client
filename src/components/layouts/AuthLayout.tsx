"use client";

import { Logo } from "@/components/common";
import { useTheme } from "@/contexts/ThemeContext";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const themeContext = useTheme();
  const colors = themeContext?.colors;

  // Fallback colors if context is not available
  const fallbackColors = {
    backgroundGradient: 'linear-gradient(135deg, #000000 0%, #161616 50%, #1a1a2e 100%)',
    accent: '#F4A800',
    accentSecondary: '#F56F10',
    text: '#F2F2F2',
    textSecondary: '#909090',
  };

  const safeColors = colors || fallbackColors;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: safeColors.backgroundGradient }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `linear-gradient(135deg, ${safeColors.accent}20, ${safeColors.accentSecondary}20)`,
          }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `linear-gradient(45deg, ${safeColors.accentSecondary}20, ${safeColors.accent}20)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center pt-16 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Marketing Content */}
            <div className="hidden lg:block space-y-8">
              <Logo 
                animated={false}
              />
              {/* Main Headline */}
              <div className="space-y-4">
                <h2
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  style={{ color: safeColors.text }}
                >
                  Welcome to{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      background: `linear-gradient(135deg, ${safeColors.accent}, ${safeColors.accentSecondary})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    WDP Materials
                  </span>
                </h2>
                <p
                  className="text-lg leading-relaxed max-w-lg"
                  style={{ color: safeColors.textSecondary }}
                >
                  Your trusted partner for premium construction materials and
                  building supplies
                </p>
              </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
