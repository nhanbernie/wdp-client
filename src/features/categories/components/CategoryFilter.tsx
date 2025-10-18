'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCategories } from '@/features/home/hooks/useCategories'
import { Tag, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border-2 border-purple-200/50">
        <div className="flex items-center justify-center gap-2 text-purple-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-medium">Đang tải...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border-2 border-purple-200/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-purple-200">
        <Tag className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Danh mục
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.id

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(category.id)}
              className={`flex items-center justify-between cursor-pointer rounded-xl px-4 py-3 transition-all duration-200 group ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-2 border-transparent'
                  : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-700 border-2 border-transparent hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-purple-400'
                  } group-hover:scale-125 transition-transform`}
                ></div>
                <p
                  className={`font-bold text-sm ${
                    isSelected ? 'text-white' : 'group-hover:text-purple-700'
                  }`}
                >
                  {category.name}
                </p>
              </div>
              <Badge
                variant={isSelected ? 'outline' : 'secondary'}
                className={`${
                  isSelected
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-purple-100 text-purple-700 border-purple-200'
                } font-bold hover:scale-110 transition-transform`}
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
