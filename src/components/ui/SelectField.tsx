"use client";

import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface SelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ name, label, options, className, ...props }, ref) => {
    const { control } = useFormContext();
    const {
      field: { onChange, value, onBlur },
      fieldState: { error },
    } = useController({
      control,
      name,
    });

    return (
      <div className="w-full mb-5">
        {label && <label className="block text-sm font-medium text-gray-800 mb-2">{label}</label>}

        <motion.div
          className="relative w-full"
          animate={error ? { x: [0, -4, 4, -2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <select
            ref={ref}
            className={cn(
              "w-full border rounded-xl px-4 py-4 text-gray-900 bg-gray-50 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-300 ease-in-out",
              error
                ? "border-red-500 bg-red-50 focus:ring-red-200"
                : "border-gray-200 hover:border-gray-300 focus:ring-primary/20",
              className
            )}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            {...props}
          >
            <option value="">Vui lòng chọn...</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Error message with smooth motion animation */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                height: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              <motion.p
                className="text-red-500 text-sm mt-1"
                initial={{ x: -5 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {error.message}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
