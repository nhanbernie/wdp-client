'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface BreadcrumbProps {
  category?: string
  productName: string
  colors: any
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ category, productName, colors }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 text-sm text-muted-foreground py-5"
    >
      <Link href="/" className="hover:text-primary transition-colors">
        Trang chủ
      </Link>
      <span>/</span>
      <Link href="/categories" className="hover:text-primary transition-colors">
        {category || 'Danh mục'}
      </Link>
      <span>/</span>
      <span className="text-foreground">{productName}</span>
    </motion.nav>
  )
}
