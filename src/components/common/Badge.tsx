'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'

interface BadgeProps {
  /** Số hiển thị trong badge */
  count?: number
  /** Có hiển thị chấm nhỏ thay vì số không */
  dot?: boolean
  /** Ẩn badge nếu count = 0 */
  showZero?: boolean
  /** Element được bao quanh (icon, text, v.v.) */
  children: React.ReactNode
  /** Kích thước badge (small/medium/large) */
  size?: 'sm' | 'md' | 'lg'
  /** Class tuỳ chỉnh */
  className?: string
  /** Class tùy chỉnh cho count */
  countClassName?: string
}

const Badge = ({
  count,
  dot = false,
  showZero = false,
  children,
  size = 'md',
  className,
  countClassName = 'bg-[var(--primary)]',
}: BadgeProps) => {
  const shouldShow = dot || (count !== undefined && (count > 0 || showZero))
  const sizeMap = {
    sm: 'h-3 w-3 text-[8px]',
    md: 'h-4 w-4 text-[10px]',
    lg: 'h-5 w-5 text-[12px]',
  }

  const { theme } = useTheme()

  return (
    <div
      className={cn(
        'relative inline-block p-2 transition-colors duration-200 cursor-pointer rounded-lg hover:bg-[var(--primary)]',
        className,
      )}
    >
      {children}
      {shouldShow && (
        <span
          className={cn(
            'absolute flex items-center justify-center rounded-full text-white font-bold p-[10px]',
            dot ? `-top-1 -right-1 ${sizeMap[size]}` : `-top-1 -right-1 ${sizeMap[size]}`,
            countClassName,
          )}
        >
          {!dot && count}
        </span>
      )}
    </div>
  )
}

export default Badge
