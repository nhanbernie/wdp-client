'use client'

import { VendorPage } from '@/features/vendor'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function VendorManagementPage() {
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
            href="/"
            className="p-3 rounded-2xl transition-all duration-200 cart-card border text-foreground hover:shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          <div>
            <h1 className="text-4xl font-bold text-foreground">Đăng ký Vendor</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Trở thành đối tác bán hàng của chúng tôi
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <VendorPage />
    </div>
  )
}
