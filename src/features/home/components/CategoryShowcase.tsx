'use client'

import { useState } from 'react'
import { CategoryDto } from '@/services/categories/category.type'
import { useCategories } from '../hooks/useCategories'
import CategoryCard from './CategoryCard'
import { motion } from 'framer-motion'
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { SectionBadge } from '@/components/common'
import { Button } from '@/components/ui/button'

const CategoryShowcase = () => {
  const { categories, loading } = useCategories({ productCount: true })
  const [showMore, setShowMore] = useState(false)
  
  const displayedCategories = showMore ? categories : categories.slice(0, 4)
  const hasMoreCategories = categories.length > 4

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative overflow-visible">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Categories title */}
        <div className="text-center mb-16 relative">
          <SectionBadge icon={Sparkles} text="Danh mục sản phẩm" className="mb-6" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-foreground"
        >
          Khám phá vật liệu xây dựng
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          Tìm kiếm trong hàng nghìn sản phẩm chất lượng cao từ các nhà cung cấp uy tín
        </motion.p>
      </div>

      {/* Categories list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 p-2">
        {!loading
          ? displayedCategories.length > 0 &&
            displayedCategories.map((cate: CategoryDto, index: number) => (
              <motion.div
                key={cate.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                <CategoryCard data={cate} />
              </motion.div>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="w-full aspect-square rounded-3xl overflow-hidden relative bg-card border border-border shadow-xl"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-accent-primary/10 animate-pulse" />

                {/* Skeleton content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <div className="mb-4 w-16 h-16 rounded-2xl bg-slate-300/50 animate-pulse" />
                  <div className="h-6 w-32 bg-slate-300/50 rounded-lg mb-3 animate-pulse" />
                  <div className="h-8 w-24 bg-slate-300/50 rounded-full animate-pulse" />
                </div>
              </motion.div>
            ))}
      </div>

      {/* Show More Button */}
      {!loading && hasMoreCategories && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button
            onClick={() => setShowMore(!showMore)}
            variant="outline"
            size="lg"
            className="group cursor-pointer font-bold px-8 py-6 text-lg rounded-2xl bg-card border-2 hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 shadow-xl"
          >
            <span className="flex items-center gap-2">
              {showMore ? (
                <>
                  Thu gọn
                  <ChevronUp className="h-5 w-5 text-accent-primary group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  Xem thêm {categories.length - 4} danh mục
                  <ChevronDown className="h-5 w-5 text-accent-primary group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </span>
          </Button>
        </motion.div>
      )}
      </div>
    </div>
  )
}

export default CategoryShowcase
