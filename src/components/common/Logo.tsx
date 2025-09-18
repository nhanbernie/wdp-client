"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface LogoProps {
  direction?: "horizontal" | "vertical";
  imageSize?: number;
  imageClassName?: string;
  textClassName?: string;
  containerClassName?: string;
  showText?: boolean;
  onClick?: () => void;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  direction = "horizontal",
  imageSize = 40,
  imageClassName,
  textClassName,
  containerClassName,
  showText = true,
  onClick,
  animated = true,
}) => {
  const { colors, brandColors } = useTheme();

  const motionProps = animated
    ? {
        whileHover: { scale: 1.05 },
        transition: { type: "spring" as const, stiffness: 400, damping: 10 },
      }
    : {};

  // WDP Logo SVG Component
  const WDPIcon = ({ size }: { size: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background Circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={brandColors.primary}
        stroke={brandColors.primaryDark}
        strokeWidth="2"
      />

      {/* Construction/Building Icon */}
      <g transform="translate(20, 25)">
        {/* Building Base */}
        <rect
          x="5"
          y="35"
          width="50"
          height="15"
          fill={colors.background}
          rx="2"
        />

        {/* Building Pillars */}
        <rect x="10" y="20" width="6" height="30" fill={colors.background} />
        <rect x="22" y="15" width="6" height="35" fill={colors.background} />
        <rect x="34" y="20" width="6" height="30" fill={colors.background} />
        <rect x="46" y="25" width="6" height="25" fill={colors.background} />

        {/* WDP Text */}
        <text
          x="30"
          y="45"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill={brandColors.primary}
        >
          WDP
        </text>
      </g>

      {/* Decorative Elements */}
      <circle
        cx="25"
        cy="25"
        r="3"
        fill={brandColors.secondary}
        opacity="0.8"
      />
      <circle
        cx="75"
        cy="75"
        r="3"
        fill={brandColors.secondary}
        opacity="0.8"
      />
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        className={cn(
          "flex items-center cursor-pointer",
          direction === "horizontal"
            ? "flex-row space-x-3"
            : "flex-col space-y-2",
          containerClassName
        )}
        onClick={onClick}
        {...motionProps}
      >
        <div
          className={cn("flex items-center justify-center", imageClassName)}
          style={{ width: imageSize, height: imageSize }}
        >
          <WDPIcon size={imageSize} />
        </div>

        {showText && (
          <span
            className={cn(
              "text-xl font-bold",
              direction === "vertical" && "text-center",
              textClassName
            )}
            style={{ color: colors.text }}
          >
            WDP
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer",
        direction === "horizontal"
          ? "flex-row space-x-3"
          : "flex-col space-y-2",
        containerClassName
      )}
      onClick={onClick}
    >
      <div
        className={cn("flex items-center justify-center", imageClassName)}
        style={{ width: imageSize, height: imageSize }}
      >
        <WDPIcon size={imageSize} />
      </div>

      {showText && (
        <span
          className={cn(
            "text-xl font-bold",
            direction === "vertical" && "text-center",
            textClassName
          )}
          style={{ color: colors.text }}
        >
          WDP
        </span>
      )}
    </div>
  );
};

export default Logo;
