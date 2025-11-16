import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { formatCurrency } from '@/lib/utils'

interface CartItem {
  id: string
  quantity: number
  totalPrice: number
  product: {
    id: string
    name: string
    images?: string[]
    price: number
    salePrice?: number
  }
  variant?: {
    optionValues?: Array<{ optionName: string; value: string }>
  }
}

interface CartSummaryPayload {
  items: CartItem[]
  totalItems: number
  totalQuantity: number
  subtotal: number
  total: number
}

interface CartMessageCardProps {
  payload: CartSummaryPayload
  isUser: boolean
}

export const CartMessageCard: React.FC<CartMessageCardProps> = ({ payload, isUser }) => {
  const { colors } = useTheme()
  const items = payload.items || []
  const webBase =
    (typeof window !== 'undefined' ? window.location.origin : '') ||
    process.env.NEXT_PUBLIC_WEB_URL ||
    ''

  return (
    <div className="flex flex-col gap-3">
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          borderColor: isUser ? 'rgba(255,255,255,0.2)' : `${colors.border}30`,
          backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : colors.cardBackground,
        }}
      >
        <div className="p-3 space-y-3">
          {items.map((it) => {
            const img = it.product.images?.[0] || '/images/placeholders/category-default.png'
            const variantText = it.variant?.optionValues
              ?.map((v) => `${v.optionName}: ${v.value}`)
              .join(', ')

            const unit = it.product.salePrice ?? it.product.price

            return (
              <div key={it.id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded overflow-hidden border" style={{ borderColor: `${colors.border}30` }}>
                  <Image src={img} alt={it.product.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{it.product.name}</p>
                  <p className="text-xs opacity-70 truncate" style={{ color: isUser ? '#fff' : colors.textSecondary }}>
                    {variantText || '—'} • x{it.quantity}
                  </p>
                  <div className="mt-1">
                    <Link
                      href={`${webBase}/products/${it.product.id}`}
                      className="text-xs underline"
                      style={{ color: isUser ? '#fff' : colors.accent }}
                      target="_blank"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold" style={{ color: isUser ? '#fff' : colors.accent }}>
                    {formatCurrency(unit, 'VND')}
                  </p>
                  <p className="text-xs opacity-70" style={{ color: isUser ? '#fff' : colors.textSecondary }}>
                    {formatCurrency(it.totalPrice, 'VND')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div
          className="px-3 py-2 border-t flex items-center justify-between text-sm"
          style={{ borderColor: `${colors.border}30`, backgroundColor: isUser ? 'rgba(255,255,255,0.06)' : colors.cardBackgroundSecondary }}
        >
          <span style={{ color: isUser ? '#fff' : colors.textSecondary }}>Tổng</span>
          <span className="font-semibold" style={{ color: isUser ? '#fff' : colors.accent }}>
            {formatCurrency(payload.total, 'VND')}
          </span>
        </div>
      </div>
    </div>
  )
}


