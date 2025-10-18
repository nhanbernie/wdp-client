'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, MessageCircle, Download, Zap } from 'lucide-react'

interface OrderActionsCardProps {
  onReorder?: () => void
  onContactSupport?: () => void
  onDownloadInvoice?: () => void
}

export function OrderActionsCard({
  onReorder,
  onContactSupport,
  onDownloadInvoice,
}: OrderActionsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <Card className="border-2 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden rounded-3xl">
        <CardHeader className="bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 border-b-2 border-slate-200 p-6">
          <CardTitle className="flex items-center text-xl font-black">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl blur-lg opacity-40" />
              <div className="relative p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
                <Zap className="h-7 w-7 text-white" />
              </div>
            </div>
            <span className="ml-4 text-slate-900">Hành động</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-6 p-6 bg-gradient-to-br from-white to-orange-50/30">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onReorder}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all group font-bold py-6 text-base rounded-2xl border-2 border-white/20"
            >
              <RotateCcw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Mua lại
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onContactSupport}
              className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all font-bold py-6 text-base rounded-2xl border-2 border-white/20"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Liên hệ hỗ trợ
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onDownloadInvoice}
              className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all font-bold py-6 text-base rounded-2xl border-2 border-white/20"
            >
              <Download className="h-5 w-5 mr-2" />
              Tải hóa đơn
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
