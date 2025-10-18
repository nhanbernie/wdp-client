'use client'

import Link from 'next/link'
import { ChevronRight, Home, FolderOpen } from 'lucide-react'
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
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 py-8"
    >
      <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border-2 border-slate-200 shadow-lg">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all duration-200 group"
        >
          <div className="p-2 bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-indigo-50 group-hover:to-purple-50 rounded-xl transition-all duration-300 group-hover:shadow-md">
            <Home className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline">Trang chủ</span>
        </Link>

        <ChevronRight className="h-4 w-4 text-slate-400" />

        <Link
          href="/categories"
          className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all duration-200 group"
        >
          <div className="p-2 bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-indigo-50 group-hover:to-purple-50 rounded-xl transition-all duration-300 group-hover:shadow-md">
            <FolderOpen className="h-4 w-4" />
          </div>
          <span className="hidden sm:inline">{category || 'Danh mục'}</span>
        </Link>

        <ChevronRight className="h-4 w-4 text-slate-400" />

        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <span className="text-sm font-black text-indigo-700 line-clamp-1 max-w-[200px]">
            {productName}
          </span>
        </div>
      </div>
    </motion.nav>
  )
}
