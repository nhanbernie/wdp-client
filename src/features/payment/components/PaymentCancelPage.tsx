'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, RefreshCw, Home, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useGetPaymentStatusQuery } from '@/services/payments/payment.service'

const PaymentCancelPage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const orderCode = searchParams.get('orderCode')

  const orderId = searchParams.get('orderId')
  const paymentId = searchParams.get('paymentId')
  const reason = searchParams.get('reason')

  const { data: paymentStatusData, refetch: checkPaymentStatus } = useGetPaymentStatusQuery(
    orderCode || '',
    { skip: !orderCode },
  )

  const serverPaymentType = (paymentStatusData as any)?.data?.payment?.paymentType as string | undefined

  const isWalletDeposit = useMemo(() => {
    if (serverPaymentType) return serverPaymentType === 'wallet_deposit'
    if (orderId) return orderId.startsWith('deposit_')
    return undefined as unknown as boolean | undefined
  }, [serverPaymentType, orderId])

  const redirectPath = useMemo(() => {
    if (typeof isWalletDeposit !== 'boolean') return null
    return isWalletDeposit ? '/vendor/wallet' : '/cart'
  }, [isWalletDeposit])

  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    if (orderCode) {
      checkPaymentStatus()
    }
  }, [orderCode, checkPaymentStatus])

  useEffect(() => {
    if (typeof isWalletDeposit !== 'boolean') {
      return undefined
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [isWalletDeposit])

  useEffect(() => {
    const typeResolved = typeof isWalletDeposit === 'boolean'
    if (!typeResolved) return
    if (!redirectPath) return

    if (countdown === 0) {
      router.push(redirectPath)
    }
  }, [countdown, redirectPath, router, isWalletDeposit])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const typeResolved = typeof isWalletDeposit === 'boolean'

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
              className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6"
            >
              <XCircle className="h-12 w-12 text-orange-600" />
            </motion.div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {!typeResolved
                ? 'Đang xác nhận giao dịch...'
                : isWalletDeposit
                  ? 'Nạp tiền đã bị hủy'
                  : 'Thanh toán đã bị hủy'}
            </h1>

            {typeResolved && (
              <p className="text-lg text-gray-600 mb-2">
                {isWalletDeposit
                  ? 'Bạn đã hủy quá trình nạp tiền vào ví'
                  : 'Bạn đã hủy quá trình thanh toán'}
              </p>
            )}

            {reason && (
              <p className="text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-lg inline-block">
                Lý do: {decodeURIComponent(reason)}
              </p>
            )}

            {/* Payment Info */}
            {orderCode && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Mã giao dịch:</span> {orderCode}
                </p>
              </div>
            )}
          </div>

          {/* Order Info */}
          {(orderId || paymentId) && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Thông tin đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orderId && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mã đơn hàng:</span>
                      <span className="text-sm font-medium">{orderId}</span>
                    </div>
                  )}
                  {paymentId && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mã thanh toán:</span>
                      <span className="text-sm font-medium">{paymentId}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* What happens next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Bước tiếp theo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium"> Thanh toán không thành công </p>
                    <p className="text-sm text-gray-600">
                      Có vẻ quá trình thanh toán đã bị gián đoạn. Bạn có thể thử lại hoặc chọn
                      phương thức thanh toán khác nhé.{' '}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Đơn hàng đã được hủy</p>
                    <p className="text-sm text-gray-600">
                      Đơn hàng của bạn đã được hủy và không tính phí
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600"> 3</span>
                  </div>
                  <div>
                    <p className="font-medium"> Chúng tôi vẫn luôn sẵn sàng phục vụ bạn </p>
                    <p className="text-sm text-gray-600">
                      Dù bạn chưa hoàn tất đơn hàng, AICShop luôn sẵn sàng khi bạn quay lại — trải
                      nghiệm mua sắm của bạn là ưu tiên hàng đầu của chúng tôi.{' '}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!typeResolved ? (
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto">
                  Về trang chủ
                </Button>
              </Link>
            ) : isWalletDeposit ? (
              <>
                <Link href="/vendor/wallet/deposit">
                  <Button size="lg" className="w-full sm:w-auto">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Thử lại nạp tiền
                  </Button>
                </Link>
                <Link href="/vendor/wallet">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Về trang ví
                  </Button>
                </Link>
                <Link href="/vendor">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Home className="h-4 w-4 mr-2" />
                    Về trang vendor
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/checkout">
                  <Button size="lg" className="w-full sm:w-auto">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Thử lại thanh toán
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Xem giỏ hàng
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tiếp tục mua sắm
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Home className="h-4 w-4 mr-2" />
                    Về trang chủ
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Auto redirect notice */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              {!typeResolved
                ? 'Đang xác nhận giao dịch...'
                : `Tự động chuyển đến ${isWalletDeposit ? 'trang ví' : 'giỏ hàng'
                } trong ${countdown} giây...`}
            </p>
          </div>

          {/* Support Info */}
          <div className="text-center mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Cần hỗ trợ?</strong> Liên hệ hotline: 1900-1212 hoặc email: support@aicshop.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentCancelPage
