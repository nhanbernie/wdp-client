'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCategories } from '@/features/home/hooks/useCategories'
import { Tag, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/contexts/ThemeContext'

export function CategoryFilter() {
  const { colors } = useTheme()
  const { categories, loading } = useCategories({ productCount: true })
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Lấy giá trị ban đầu từ URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get('categoryId') || ''
    setSelectedCategory(categoryFromUrl)
  }, [searchParams])

  const handleSelect = (id: string) => {
    const newSelected = selectedCategory === id ? '' : id
    setSelectedCategory(newSelected)

    const params = new URLSearchParams(searchParams)
    if (newSelected) {
      params.set('categoryId', newSelected)
    } else {
      params.delete('categoryId')
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  if (loading) {
    return (
      <div 
        className="rounded-3xl shadow-xl p-4 hover:shadow-2xl transition-all duration-300"
        style={{ 
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center justify-center gap-2" style={{ color: colors.textSecondary }}>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Đang tải...</span>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="rounded-3xl shadow-xl p-4 hover:shadow-2xl transition-all duration-300"
      style={{ 
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }}
    >
      <div 
        className="flex items-center gap-2 mb-3 pb-2 border-b"
        style={{ borderColor: colors.border }}
      >
        <Tag className="h-4 w-4" style={{ color: colors.textSecondary }} />
        <h3 className="text-base font-semibold" style={{ color: colors.text }}>
          Danh mục
        </h3>
      </div>

      <div className="flex flex-col gap-1.5">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.id

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(category.id)}
              className="flex items-center justify-between cursor-pointer rounded-xl px-3 py-2 transition-all duration-200"
              style={{
                backgroundColor: isSelected ? colors.accent : 'transparent',
                color: isSelected ? 'white' : colors.text,
                border: `1px solid ${isSelected ? 'transparent' : colors.border}`,
                boxShadow: isSelected ? '0 2px 4px -1px rgba(0, 0, 0, 0.1)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = `${colors.accent}10`
                  e.currentTarget.style.borderColor = colors.accent
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = colors.border
                }
              }}
            >
              <p className="font-medium text-sm">
                {category.name}
              </p>
              <Badge
                variant={isSelected ? 'outline' : 'secondary'}
                className="text-xs font-semibold"
                style={{
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : `${colors.accent}10`,
                  color: isSelected ? 'white' : colors.textSecondary,
                  borderColor: isSelected ? 'rgba(255, 255, 255, 0.3)' : colors.border,
                }}
              >
                {category.productCount}
              </Badge>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
