"use client";

import { Logo } from "@/components/common";
import { useTheme } from "@/contexts/ThemeContext";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: colors.backgroundGradient }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accentSecondary}20)`,
          }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `linear-gradient(45deg, ${colors.accentSecondary}20, ${colors.accent}20)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Marketing Content */}

            <div className="space-y-8">
              <Logo />
              {/* Main Headline */}
              <div className="space-y-4">
                <h2
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  style={{ color: colors.text }}
                >
                  Welcome to{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentSecondary})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    Viral Predictor
                  </span>
                </h2>
                <p
                  className="text-lg leading-relaxed max-w-lg"
                  style={{ color: colors.textSecondary }}
                >
                  Predict your viral potential with AI-powered analytics before
                  you publish
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                {/* Like start card */}
              </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="flex justify-center lg:justify-end">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
