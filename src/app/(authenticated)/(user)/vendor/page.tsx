'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Building2 } from 'lucide-react'
import Link from 'next/link'
import { VendorPage } from '@/features/vendor'

const VendorRoute: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
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
    </div>
  )
}

export default VendorRoute
