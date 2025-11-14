'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  useGetWithdrawalRequestsQuery,
  useApproveWithdrawalRequestMutation,
  useRejectWithdrawalRequestMutation,
  useMarkWithdrawalRequestAsPaidMutation,
} from '@/services/admin/admin.api'
import { useToast } from '@/hooks/useToast'
import {
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  DollarSign,
  Filter,
  RefreshCw,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TextAreaField } from '@/components/common/TextAreaField'
import FormProvider from '@/components/form/FormProvider'
import * as z from 'zod'
import { useTheme } from '@/contexts/ThemeContext'

const adminNotesSchema = z.object({
  adminNotes: z.string().optional(),
})

type AdminNotesFormData = z.infer<typeof adminNotesSchema>

const statusOptions = [
  { value: '', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ duyệt' },
  { value: 'approved', label: 'Đã duyệt' },
  { value: 'paid', label: 'Đã thanh toán' },
  { value: 'rejected', label: 'Từ chối' },
]

export const WithdrawalsManagement: React.FC = () => {
  const { colors } = useTheme()
  const toast = useToast()
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [page, setPage] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'mark-paid' | null>(null)

  const { data, isLoading, refetch } = useGetWithdrawalRequestsQuery({
    page,
    limit: 20,
    status: statusFilter || undefined,
  })

  const [approveRequest, { isLoading: isApproving }] = useApproveWithdrawalRequestMutation()
  const [rejectRequest, { isLoading: isRejecting }] = useRejectWithdrawalRequestMutation()
  const [markAsPaid, { isLoading: isMarkingPaid }] = useMarkWithdrawalRequestAsPaidMutation()

  const requests = data?.data || []
  const meta = data?.meta

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

  const handleAction = async (formData: AdminNotesFormData, methods?: any) => {
    if (!selectedRequest) return

    try {
      const payload = {
        id: selectedRequest.id,
        adminNotes: formData.adminNotes,
      }

      if (actionType === 'approve') {
        await approveRequest(payload).unwrap()
        toast.success('Thành công', 'Yêu cầu đã được duyệt')
      } else if (actionType === 'reject') {
        await rejectRequest(payload).unwrap()
        toast.success('Thành công', 'Yêu cầu đã bị từ chối')
      } else if (actionType === 'mark-paid') {
        await markAsPaid(payload).unwrap()
        toast.success('Thành công', 'Yêu cầu đã được đánh dấu là đã thanh toán')
      }

      // Reset form before closing
      if (methods?.reset) {
        methods.reset({ adminNotes: '' })
      }

      // Close modal immediately
      setActionType(null)
      setSelectedRequest(null)
      
      // Refetch data
      refetch()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Không thể thực hiện thao tác')
    }
  }

  const openActionDialog = (request: any, type: 'approve' | 'reject' | 'mark-paid') => {
    setSelectedRequest(request)
    setActionType(type)
  }

  const getActionTitle = () => {
    switch (actionType) {
      case 'approve':
        return 'Duyệt yêu cầu rút tiền'
      case 'reject':
        return 'Từ chối yêu cầu rút tiền'
      case 'mark-paid':
        return 'Đánh dấu đã thanh toán'
      default:
        return ''
    }
  }

  const getActionDescription = () => {
    switch (actionType) {
      case 'approve':
        return 'Yêu cầu này sẽ được duyệt và chờ kế toán chuyển khoản'
      case 'reject':
        return 'Yêu cầu này sẽ bị từ chối và vendor sẽ được thông báo'
      case 'mark-paid':
        return 'Đánh dấu yêu cầu đã được thanh toán. Số tiền sẽ được trừ từ ví của vendor'
      default:
        return ''
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý yêu cầu rút tiền</h1>
              <p className="text-gray-600">Duyệt và quản lý các yêu cầu rút tiền từ vendor</p>
            </div>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Bộ lọc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setPage(1)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách yêu cầu rút tiền</CardTitle>
            <CardDescription>
              Tổng số: {meta?.total || 0} yêu cầu | Trang {page} / {meta?.totalPages || 1}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Không có yêu cầu rút tiền nào</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request: any) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-2xl font-bold text-gray-900">
                            {Number(request.amount).toLocaleString('vi-VN')} VND
                          </p>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Vendor</p>
                            <p className="font-medium">
                              {request.vendor?.businessName || request.vendorId}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Thông tin ngân hàng</p>
                            <p className="font-medium">
                              {request.bankName} - {request.bankAccountNumber}
                            </p>
                            <p className="text-sm text-gray-600">{request.accountHolderName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Ngày tạo</p>
                            <p className="font-medium">
                              {format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm', {
                                locale: vi,
                              })}
                            </p>
                          </div>
                          {request.approvedAt && (
                            <div>
                              <p className="text-sm text-gray-500">Ngày duyệt</p>
                              <p className="font-medium">
                                {format(new Date(request.approvedAt), 'dd/MM/yyyy HH:mm', {
                                  locale: vi,
                                })}
                              </p>
                            </div>
                          )}
                          {request.paidAt && (
                            <div>
                              <p className="text-sm text-gray-500">Ngày thanh toán</p>
                              <p className="font-medium">
                                {format(new Date(request.paidAt), 'dd/MM/yyyy HH:mm', {
                                  locale: vi,
                                })}
                              </p>
                            </div>
                          )}
                        </div>

                        {request.notes && (
                          <div className="mb-2">
                            <p className="text-sm text-gray-500">Ghi chú từ vendor:</p>
                            <p className="text-sm text-gray-700">{request.notes}</p>
                          </div>
                        )}

                        {request.adminNotes && (
                          <div className="mb-2">
                            <p className="text-sm text-blue-600 font-medium">Ghi chú từ admin:</p>
                            <p className="text-sm text-gray-700">{request.adminNotes}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => openActionDialog(request, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Duyệt
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => openActionDialog(request, 'reject')}
                              style={{
                                backgroundColor: colors.error,
                                color: 'white',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${colors.error}dd`
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.error
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Từ chối
                            </Button>
                          </>
                        )}
                        {request.status === 'approved' && (
                          <Button
                            size="sm"
                            onClick={() => openActionDialog(request, 'mark-paid')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Đánh dấu đã thanh toán
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Trước
                </Button>
                <span className="text-sm text-gray-600">
                  Trang {page} / {meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                >
                  Sau
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Dialog */}
        <Dialog
          open={actionType !== null}
          onOpenChange={(open) => {
            if (!open) {
              setActionType(null)
              setSelectedRequest(null)
            }
          }}
        >
          <DialogContent
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: colors.text }}>{getActionTitle()}</DialogTitle>
              <DialogDescription style={{ color: colors.textSecondary }}>
                {getActionDescription()}
              </DialogDescription>
            </DialogHeader>

            {selectedRequest && (
              <div
                className="my-4 p-4 rounded-lg"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                      Vendor:
                    </p>
                    <p className="font-medium" style={{ color: colors.text }}>
                      {selectedRequest.vendor?.businessName || selectedRequest.vendorId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                      Số tiền:
                    </p>
                    <p className="text-xl font-bold" style={{ color: colors.accent }}>
                      {Number(selectedRequest.amount).toLocaleString('vi-VN')} VND
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                      Thông tin ngân hàng:
                    </p>
                    <p className="font-medium" style={{ color: colors.text }}>
                      {selectedRequest.bankName}
                      {selectedRequest.bankBranch && ` - ${selectedRequest.bankBranch}`} -{' '}
                      {selectedRequest.bankAccountNumber}
                    </p>
                    <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                      {selectedRequest.accountHolderName}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <FormProvider<AdminNotesFormData>
              defaultValues={{ adminNotes: '' }}
              validationSchema={adminNotesSchema}
              onSubmit={handleAction}
              mode="onChange"
            >
              <TextAreaField
                name="adminNotes"
                label="Ghi chú (tùy chọn)"
                placeholder="Nhập ghi chú cho thao tác này..."
                rows={3}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActionType(null)}
                  disabled={isApproving || isRejecting || isMarkingPaid}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.textSecondary,
                  }}
                  onMouseEnter={(e) => {
                    if (!isApproving && !isRejecting && !isMarkingPaid) {
                      e.currentTarget.style.backgroundColor = colors.hoverBackground
                      e.currentTarget.style.borderColor = colors.textSecondary
                      e.currentTarget.style.color = colors.text
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isApproving && !isRejecting && !isMarkingPaid) {
                      e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
                      e.currentTarget.style.borderColor = colors.border
                      e.currentTarget.style.color = colors.textSecondary
                    }
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isApproving || isRejecting || isMarkingPaid}
                  style={{
                    backgroundColor:
                      actionType === 'reject'
                        ? colors.error
                        : actionType === 'mark-paid'
                          ? colors.accent
                          : colors.success,
                    color: 'white',
                  }}
                  onMouseEnter={(e) => {
                    if (!isApproving && !isRejecting && !isMarkingPaid) {
                      if (actionType === 'reject') {
                        e.currentTarget.style.backgroundColor = `${colors.error}dd`
                      } else if (actionType === 'mark-paid') {
                        e.currentTarget.style.backgroundColor = colors.accentSecondary
                      } else {
                        e.currentTarget.style.backgroundColor = `${colors.success}dd`
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isApproving && !isRejecting && !isMarkingPaid) {
                      if (actionType === 'reject') {
                        e.currentTarget.style.backgroundColor = colors.error
                      } else if (actionType === 'mark-paid') {
                        e.currentTarget.style.backgroundColor = colors.accent
                      } else {
                        e.currentTarget.style.backgroundColor = colors.success
                      }
                    }
                  }}
                >
                  {(isApproving || isRejecting || isMarkingPaid) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {actionType === 'approve' && 'Duyệt'}
                  {actionType === 'reject' && 'Từ chối'}
                  {actionType === 'mark-paid' && 'Đánh dấu đã thanh toán'}
                </Button>
              </DialogFooter>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}

