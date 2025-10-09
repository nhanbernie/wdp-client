'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <Shield className="h-24 w-24 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Không có quyền truy cập</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Bạn không có quyền truy cập vào trang này
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
