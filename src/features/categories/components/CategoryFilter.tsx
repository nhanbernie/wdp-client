'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCategories } from '@/features/home/hooks/useCategories'

export function CategoryFilter() {
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
      <div className="cart-card border rounded-xl p-6 text-muted-foreground text-center">
        Đang tải danh mục...
      </div>
    )
  }

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h3>

      <div className="flex flex-col gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id

          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(category.id)}
              className={`flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 transition-all
                ${
                  isSelected
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-foreground'
                }
              `}
            >
              <p className="font-medium text-[0.9rem]">{category.name}</p>
              <p className="text-[0.9rem]">{category.productCount}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
