'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft, Package, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useGetPaymentStatusQuery } from '@/services/payments/payment.service'

const PaymentSuccessPage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const orderCode = searchParams.get('orderCode')
  const amount = searchParams.get('amount')
  
  const orderId = searchParams.get('orderId')
  const paymentId = searchParams.get('paymentId')
  
  const { data: paymentStatusData, refetch: checkPaymentStatus } = useGetPaymentStatusQuery(
    orderCode || '',
    { skip: !orderCode }
  )

  const [countdown, setCountdown] = useState(15)
  const serverPaymentType = (paymentStatusData as any)?.data?.payment?.paymentType as string | undefined
  const isWalletDeposit = useMemo(() => {
    if (!serverPaymentType) return undefined as unknown as boolean | undefined
    return serverPaymentType === 'wallet_deposit'
  }, [serverPaymentType])

  const redirectPath = isWalletDeposit ? '/wallet' : '/orders'


  useEffect(() => {
    // Check payment status ngay khi vào trang (nếu có orderCode)
    if (orderCode) {
      checkPaymentStatus()
    }
  }, [orderCode, checkPaymentStatus])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      router.replace(redirectPath)
    }
  }, [countdown, redirectPath, router])

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
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {!typeResolved
                ? 'Đang xác nhận giao dịch...'
                : isWalletDeposit
                ? 'Nạp tiền thành công!'
                : 'Thanh toán thành công!'}
            </h1>

            {typeResolved && (
              <p className="text-lg text-gray-600 mb-2">
                {isWalletDeposit
                  ? 'Số tiền đã được cộng vào ví của bạn'
                  : 'Cảm ơn bạn đã mua sắm tại AICShop'}
              </p>
            )}

            {typeResolved && !isWalletDeposit && (
              <p className="text-sm text-gray-500">
                Chúng tôi sẽ gửi email xác nhận đơn hàng đến bạn trong vài phút tới.
              </p>
            )}

            {/* Payment Info */}
            {(orderCode || amount) && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                {orderCode && (
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Mã giao dịch:</span> {orderCode}
                  </p>
                )}
                {amount && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">Số tiền:</span>{' '}
                    {formatPrice(Number(amount))}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Next Steps */}
          {typeResolved && !isWalletDeposit && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
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
                      <p className="font-medium">Xác nhận đơn hàng</p>
                      <p className="text-sm text-gray-600">Chúng tôi đang xử lý đơn hàng của bạn</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Chuẩn bị hàng</p>
                      <p className="text-sm text-gray-600">Đóng gói và chuẩn bị vận chuyển</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Giao hàng</p>
                      <p className="text-sm text-gray-600">Giao hàng trong 2-3 ngày làm việc</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {typeResolved && isWalletDeposit && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Thông tin ví
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Số tiền đã được cộng vào ví</p>
                      <p className="text-sm text-gray-600">
                        Bạn có thể sử dụng số tiền này để xử lý đơn hàng và thanh toán phí sàn
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isWalletDeposit ? (
              <>
                <Link href="/vendor/wallet">
                  <Button size="lg" className="w-full sm:w-auto">
                    Xem số dư ví
                  </Button>
                </Link>
                <Link href="/vendor">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Về trang vendor
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/orders">
                  <Button size="lg" className="w-full sm:w-auto">
                    Xem đơn hàng của tôi
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Tiếp tục mua sắm
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
                : `Tự động chuyển đến ${isWalletDeposit ? 'trang ví' : 'trang đơn hàng'} trong ${countdown} giây...`}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
