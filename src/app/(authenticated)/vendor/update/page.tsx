'use client'

import { VendorPage } from '@/features/vendor/update-vendor'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function VendorUpdatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-6 mb-8">
          <Link
            href="/vendor"
            className="p-3 rounded-2xl transition-all duration-200 cart-card border text-foreground hover:shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          <div>
            <h1 className="text-4xl font-bold text-foreground">Cập nhật Vendor</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Cập nhật thông tin đối tác bán hàng
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <VendorPage />
    </div>
  )
}
