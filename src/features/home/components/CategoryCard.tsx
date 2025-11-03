'use client'

import { CategoryDto } from '@/services/categories/category.type'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'

type Props = {
  data: CategoryDto
}

const CategoryCard = ({ data }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative cursor-pointer"
    >
      <div className="w-full aspect-square rounded-3xl overflow-hidden relative bg-card shadow-xl hover:shadow-2xl transition-all duration-500 border border-border hover:border-accent-primary">
        {/* Image with overlay */}
        {data.thumbnail && (
          <div className="relative w-full h-full">
            <Image
              src={data.thumbnail || '/images/placeholders/category-default.png'}
              alt={data?.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
          {/* Icon badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mb-4 p-3 rounded-2xl bg-accent-primary shadow-lg group-hover:shadow-xl group-hover:shadow-accent-primary/50 transition-all duration-300"
          >
            <Package className="h-8 w-8 text-white" />
          </motion.div>

          {/* Text content */}
          <div className="text-center text-white transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-xl font-black mb-2 drop-shadow-lg">{data.name}</h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <span className="text-sm font-bold">{data.productCount}</span>
              <span className="text-sm font-medium">sản phẩm</span>
            </div>
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Bottom gradient indicator */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

export default CategoryCard
