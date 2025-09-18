"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  const motionProps = animated
    ? {
        whileHover: { scale: 1.05 },
        transition: { type: "spring" as const, stiffness: 400, damping: 10 },
      }
    : {};

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
          <Image
            src="/wdp-logo.svg"
            alt="WDP"
            width={imageSize}
            height={imageSize}
            className="w-full h-full object-contain"
          />
        </div>

        {showText && (
          <span
            className={cn(
              "text-xl font-bold text-white",
              direction === "vertical" && "text-center",
              textClassName
            )}
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
        <Image
          src="/wdp-logo.svg"
          alt="WDP"
          width={imageSize}
          height={imageSize}
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <span
          className={cn(
            "text-xl font-bold text-white",
            direction === "vertical" && "text-center",
            textClassName
          )}
        >
          WDP
        </span>
      )}
    </div>
  );
};

export default Logo;
