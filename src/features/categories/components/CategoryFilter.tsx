'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { categories } from '../data/categories.data'

export function CategoryFilter() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    )
  }

  const toggleSelection = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    )
  }

  return (
    <div className="cart-card border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h3>

      <div className="space-y-4">
        {categories.map((category) => {
          const expanded = expandedCategories.includes(category.name)
          const selected = selectedCategories.includes(category.name)

          return (
            <motion.div key={category.name} className="py-3">
              {/* Category row */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Checkbox
                    id={category.name}
                    checked={selected}
                    onCheckedChange={() => toggleSelection(category.name)}
                  />
                  <label
                    htmlFor={category.name}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {category.name}
                  </label>
                  <Badge variant={selected ? 'default' : 'secondary'} className="text-xs">
                    {category.count}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="p-1 rounded hover:bg-accent"
                >
                  {expanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </motion.div>

              {/* Animated subcategories */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="ml-6 mt-2 space-y-2 border-l pl-4"
                  >
                    {category.subcategories.map((sub, index) => (
                      <motion.div
                        key={sub}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 p-1"
                      >
                        <Checkbox id={sub} />
                        <label
                          htmlFor={sub}
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          {sub}
                        </label>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
