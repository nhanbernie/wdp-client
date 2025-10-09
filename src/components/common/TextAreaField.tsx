'use client'

import React, { forwardRef } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '@/contexts/ThemeContext'

interface TextAreaFieldProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  name: string
  label?: string
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ name, label, className, ...props }, ref) => {
    const { control } = useFormContext()
    const { colors } = useTheme()
    const {
      field: { onChange, value, onBlur },
      fieldState: { error },
    } = useController({
      control,
      name,
    })

    return (
      <div className="w-full mb-5">
        {label && (
          <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
            {label}
          </label>
        )}

        <motion.div
          className="relative w-full"
          animate={error ? { x: [0, -4, 4, -2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <textarea
            ref={ref}
            className={cn(
              'w-full border rounded-xl px-4 py-4 text-base focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ease-in-out resize-none',
              className,
            )}
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: error ? '#ef4444' : colors.border,
              color: colors.text,
            }}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            {...props}
          />
        </motion.div>

        {/* Error message with smooth motion animation */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
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
    )
  },
)

TextAreaField.displayName = 'TextAreaField'

export default TextAreaField
