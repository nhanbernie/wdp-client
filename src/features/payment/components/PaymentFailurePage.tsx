'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const PaymentFailurePage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const paymentId = searchParams.get('paymentId')
  const error = searchParams.get('error')

  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/checkout')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
            >
              <XCircle className="h-12 w-12 text-red-600" />
            </motion.div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Thanh toán thất bại
            </h1>

            <p className="text-lg text-gray-600 mb-2">
              Rất tiếc, quá trình thanh toán của bạn không thành công
            </p>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">
                {decodeURIComponent(error)}
              </p>
            )}
          </div>

          {/* Possible Reasons */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nguyên nhân có thể</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Số dư tài khoản không đủ</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Thông tin thẻ không chính xác</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Kết nối mạng không ổn định</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Hệ thống thanh toán tạm thời bảo trì</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout">
              <Button size="lg" className="w-full sm:w-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Thử lại thanh toán
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại giỏ hàng
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Button>
            </Link>
          </div>

          {/* Auto redirect notice */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Tự động chuyển đến trang thanh toán trong {countdown} giây...
            </p>
          </div>

          {/* Support Info */}
          <div className="text-center mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Cần hỗ trợ?</strong> Liên hệ hotline: 1900-xxxx hoặc email: support@wdp.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentFailurePage
