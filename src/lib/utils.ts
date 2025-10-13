import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number, currency: string) => {
  const locale = 'vi-VN'
  return `${value.toLocaleString(locale)} ${currency}`
}

export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number) {
  if (originalPrice <= 0) return 0
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100
  return parseFloat(discount.toFixed(0))
}
