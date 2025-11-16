import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { formatCurrency } from '@/lib/utils'

interface ProductItem {
  id: string
  name: string
  thumbnail?: string
  price: number
  currency?: string
  brand?: string
}

interface SearchProductsPayload {
  items: ProductItem[]
  pagination?: any
}

interface Props {
  payload: SearchProductsPayload
  isUser: boolean
}

export const SearchProductsMessageCard: React.FC<Props> = ({ payload, isUser }) => {
  const { colors } = useTheme()
  const items = payload.items || []
  const webBase =
    (typeof window !== 'undefined' ? window.location.origin : '') ||
    process.env.NEXT_PUBLIC_WEB_URL ||
    ''

  return (
    <div
      className="rounded-lg overflow-hidden border"
      style={{
        borderColor: isUser ? 'rgba(255,255,255,0.2)' : `${colors.border}30`,
        backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : colors.cardBackground,
      }}
    >
      <div className="p-3 space-y-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded overflow-hidden border" style={{ borderColor: `${colors.border}30` }}>
              <Image
                src={p.thumbnail || '/images/placeholders/category-default.png'}
                alt={p.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{p.name}</p>
              {p.brand && (
                <p className="text-xs opacity-70 truncate" style={{ color: isUser ? '#fff' : colors.textSecondary }}>
                  {p.brand}
                </p>
              )}
              <div className="mt-1">
                <Link
                  href={`${webBase}/products/${p.id}`}
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
                {formatCurrency(p.price, p.currency || 'VND')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


