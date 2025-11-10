'use client'

import React from 'react'
import Image from 'next/image'
import { ProductDto } from '@/services/api/product.type'
import { formatCurrency } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'

interface ProductMessageCardProps {
  product: ProductDto
  isUser: boolean
}

export const ProductMessageCard: React.FC<ProductMessageCardProps> = ({ product, isUser }) => {
  const { colors } = useTheme()

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm whitespace-pre-wrap font-semibold mb-2">{product.name}</p>
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          borderColor: isUser ? 'rgba(255,255,255,0.2)' : `${colors.border}30`,
          backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : colors.cardBackground,
        }}
      >
        <div className="relative w-full h-32">
          <Image
            src={product.thumbnail || '/images/placeholders/category-default.png'}
            alt={product.name}
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs opacity-70 mb-1"
                style={{ color: isUser ? '#fff' : colors.textSecondary }}
              >
                {product.brand}
              </p>
              <div className="flex items-baseline gap-2">
                {product.salePrice && (
                  <span
                    className="text-xs line-through opacity-60"
                    style={{ color: isUser ? '#fff' : colors.textSecondary }}
                  >
                    {formatCurrency(product.price, product.currency)}
                  </span>
                )}
                <span
                  className="font-bold text-sm"
                  style={{ color: isUser ? '#fff' : colors.accent }}
                >
                  {formatCurrency(product.salePrice || product.price, product.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
