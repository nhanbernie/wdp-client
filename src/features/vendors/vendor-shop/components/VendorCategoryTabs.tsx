'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface Category {
  id: string
  name: string
  count: number
}

interface Props {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

export const VendorCategoryTabs: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { colors } = useTheme()

  return (
    <div className="mb-6">
      <div className="border-b" style={{ borderColor: colors.border }}>
        <div className="flex gap-1 overflow-x-auto">
          <button
            onClick={() => onSelectCategory('all')}
            className="px-6 py-3 font-medium transition-colors whitespace-nowrap"
            style={{
              color: selectedCategory === 'all' ? colors.accent : colors.textSecondary,
              borderBottom:
                selectedCategory === 'all' ? `2px solid ${colors.accent}` : '2px solid transparent',
            }}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="px-6 py-3 font-medium transition-colors whitespace-nowrap"
              style={{
                color: selectedCategory === cat.id ? colors.accent : colors.textSecondary,
                borderBottom:
                  selectedCategory === cat.id
                    ? `2px solid ${colors.accent}`
                    : '2px solid transparent',
              }}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
