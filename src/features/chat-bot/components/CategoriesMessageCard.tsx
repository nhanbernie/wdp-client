'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'

interface CategoryItem {
  id: string
  name: string
  slug: string
  thumbnail?: string
}

interface CategoriesPayload {
  items: CategoryItem[]
  pagination?: any
}

interface Props {
  payload: CategoriesPayload
  isUser: boolean
}

export const CategoriesMessageCard: React.FC<Props> = ({ payload, isUser }) => {
  const { colors } = useTheme()
  const items = payload.items || []

  return (
    <div
      className="rounded-2xl p-3"
      style={{
        backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : colors.cardBackground,
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((c) => (
          <Link
            key={c.id}
            href={`/categories?slug=${encodeURIComponent(c.slug)}`}
            className="group rounded-xl overflow-hidden"
            style={{
              backgroundColor: isUser ? 'transparent' : colors.cardBackgroundSecondary,
            }}
          >
            <div className="relative w-full h-24">
              <Image
                src={c.thumbnail || '/images/placeholders/category-default.png'}
                alt={c.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="160px"
              />
            </div>
            <div className="p-2">
              <p className="text-xs font-medium line-clamp-2">{c.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


