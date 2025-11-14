'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { Badge } from '@/components/ui/badge'
import { useGetWalletBalanceQuery, useCreateWithdrawalRequestMutation, useGetWithdrawalRequestsQuery } from '@/services/wallet'
import { useGetMyVendorProfileQuery } from '@/services/vendor/vendor.service'
import { useToast } from '@/hooks/useToast'
import { Loader2, Wallet, ArrowDown, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import * as z from 'zod'
import FormProvider from '@/components/form/FormProvider'
import { useFormContext } from 'react-hook-form'

const withdrawalSchema = z.object({
  amount: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined
      const num = typeof val === 'string' ? parseFloat(val) : Number(val)
      return isNaN(num) ? undefined : num
    },
    z
      .number({ message: 'Số tiền phải là một số hợp lệ' })
      .min(100000, 'Số tiền rút tối thiểu là 100,000 VND')
      .max(1000000000, 'Số tiền rút tối đa là 1,000,000,000 VND'),
  ),
  notes: z.string().optional(),
})

type WithdrawalFormData = z.infer<typeof withdrawalSchema>

// Component để check form validation và enable/disable button
const WithdrawalFormContent: React.FC<{
  hasBankInfo: boolean
  hasPendingRequest: boolean
  isCreating: boolean
}> = ({ hasBankInfo, hasPendingRequest, isCreating }) => {
  const {
    formState: { isValid, errors },
    watch,
  } = useFormContext<WithdrawalFormData>()

  const amount = watch('amount')
  // Check if form is valid: isValid from react-hook-form and amount is valid number >= 10000
  const amountValue = amount ? Number(amount) : 0
  const isFormValid = isValid && !errors.amount && amountValue >= 10000 && amountValue <= 1000000000

  return (
    <div className="space-y-4">
      <TextField
        name="amount"
        label="Số tiền rút (VND)"
        type="number"
        placeholder="100000"
        required
        disabled={!hasBankInfo || hasPendingRequest || isCreating}
      />

      <TextAreaField
        name="notes"
        label="Ghi chú (tùy chọn)"
        placeholder="Nhập ghi chú cho yêu cầu rút tiền..."
        rows={3}
        disabled={!hasBankInfo || hasPendingRequest || isCreating}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={!hasBankInfo || hasPendingRequest || isCreating || !isFormValid}
      >
        {isCreating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Đang tạo...
          </>
        ) : (
          <>
            <ArrowDown className="w-4 h-4 mr-2" />
            Tạo yêu cầu rút tiền
          </>
        )}
      </Button>
    </div>
  )
}

export const WithdrawalRequestPage: React.FC = () => {
  const toast = useToast()
  const { data: balanceData, isLoading: balanceLoading } = useGetWalletBalanceQuery()
  const { data: profileData } = useGetMyVendorProfileQuery()
  const { data: requestsData, refetch: refetchRequests } = useGetWithdrawalRequestsQuery({ page: 1, limit: 10 })
  const [createWithdrawal, { isLoading: isCreating }] = useCreateWithdrawalRequestMutation()

  const profile = profileData?.data
  const balance = balanceData?.data
  const requests = requestsData?.data || []

  const hasBankInfo = !!(
    profile?.bankName &&
    profile?.bankAccountNumber &&
    profile?.accountHolderName
  )
  const hasPendingRequest = requests.some((r) => r.status === 'pending')

  const onSubmit = async (data: WithdrawalFormData, methods?: any) => {
    if (!hasBankInfo) {
      toast.error(
        'Thiếu thông tin',
        'Vui lòng cập nhật thông tin tài khoản ngân hàng trong hồ sơ trước khi tạo yêu cầu rút tiền',
      )
      return
    }

    if (hasPendingRequest) {
      toast.error(
        'Yêu cầu đang chờ xử lý',
        'Bạn đã có một yêu cầu rút tiền đang chờ xử lý. Vui lòng đợi yêu cầu hiện tại được xử lý.',
      )
      return
    }

    if (balance && data.amount > balance.availableBalance) {
      toast.error(
        'Số dư không đủ',
        `Số dư khả dụng: ${balance.availableBalance.toLocaleString('vi-VN')} VND`,
      )
      return
    }

    try {
      await createWithdrawal(data).unwrap()
      toast.success('Thành công', 'Yêu cầu rút tiền đã được tạo thành công')
      // Reset form after successful submission
      if (methods?.reset) {
        methods.reset({ amount: undefined, notes: '' })
      }
      refetchRequests()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Không thể tạo yêu cầu rút tiền')
    }
  }

  const getStatusBadge = (status: string) => {
    const configs = {
      pending: { label: 'Chờ duyệt', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Đã duyệt', icon: CheckCircle, className: 'bg-blue-100 text-blue-800' },
      paid: { label: 'Đã thanh toán', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Từ chối', icon: XCircle, className: 'bg-red-100 text-red-800' },
      cancelled: { label: 'Đã hủy', icon: AlertCircle, className: 'bg-gray-100 text-gray-800' },
    }
    const config = configs[status as keyof typeof configs] || configs.pending
    const Icon = config.icon
    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  if (balanceLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rút tiền từ ví</h1>
          <p className="text-gray-600">Tạo yêu cầu rút tiền từ ví của bạn</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Số dư ví
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Số dư hiện tại</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {balance?.balance.toLocaleString('vi-VN')} VND
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số dư khả dụng</p>
                  <p className="text-xl font-semibold text-blue-600">
                    {balance?.availableBalance.toLocaleString('vi-VN')} VND
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Withdrawal Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tạo yêu cầu rút tiền</CardTitle>
              <CardDescription>
                {!hasBankInfo && (
                  <span className="text-red-600">
                    ⚠️ Vui lòng cập nhật thông tin tài khoản ngân hàng trong hồ sơ trước khi tạo yêu cầu
                  </span>
                )}
                {hasBankInfo && hasPendingRequest && (
                  <span className="text-yellow-600">
                    ⚠️ Bạn đã có một yêu cầu đang chờ xử lý
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasBankInfo && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Thông tin tài khoản nhận tiền:</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Ngân hàng:</strong> {profile?.bankName}
                      {profile?.bankBranch && ` - ${profile.bankBranch}`}
                    </p>
                    <p>
                      <strong>Số tài khoản:</strong> {profile?.bankAccountNumber}
                    </p>
                    <p>
                      <strong>Chủ tài khoản:</strong> {profile?.accountHolderName}
                    </p>
                  </div>
                </div>
              )}

              <FormProvider<WithdrawalFormData>
                defaultValues={{ amount: undefined, notes: '' }}
                validationSchema={withdrawalSchema}
                onSubmit={onSubmit}
                mode="onChange"
              >
                <WithdrawalFormContent
                  hasBankInfo={hasBankInfo}
                  hasPendingRequest={hasPendingRequest}
                  isCreating={isCreating}
                />
              </FormProvider>
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests */}
        {requests.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Lịch sử yêu cầu rút tiền</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold text-lg">
                          {Number(request.amount).toLocaleString('vi-VN')} VND
                        </p>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-gray-500">
                        {format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </p>
                      {request.notes && (
                        <p className="text-sm text-gray-600 mt-1">{request.notes}</p>
                      )}
                      {request.adminNotes && (
                        <p className="text-sm text-blue-600 mt-1">
                          <strong>Ghi chú từ admin:</strong> {request.adminNotes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}


