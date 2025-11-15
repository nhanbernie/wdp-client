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
  Wallet,
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
      pending: {
        label: 'Chờ duyệt',
        icon: Clock,
        bgColor: colors.warning + '20',
        textColor: colors.warning,
        borderColor: colors.warning,
      },
      approved: {
        label: 'Đã duyệt',
        icon: CheckCircle,
        bgColor: colors.accent + '20',
        textColor: colors.accent,
        borderColor: colors.accent,
      },
      paid: {
        label: 'Đã thanh toán',
        icon: CheckCircle,
        bgColor: colors.success + '20',
        textColor: colors.success,
        borderColor: colors.success,
      },
      rejected: {
        label: 'Từ chối',
        icon: XCircle,
        bgColor: colors.error + '20',
        textColor: colors.error,
        borderColor: colors.error,
      },
      cancelled: {
        label: 'Đã hủy',
        icon: AlertCircle,
        bgColor: colors.textSecondary + '20',
        textColor: colors.textSecondary,
        borderColor: colors.textSecondary,
      },
    }
    const config = configs[status as keyof typeof configs] || configs.pending
    const Icon = config.icon
    return (
      <span
        className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border-2 shadow-sm transition-all"
        style={{
          backgroundColor: config.bgColor,
          color: config.textColor,
          borderColor: config.borderColor,
        }}
      >
        <Icon className="w-3 h-3 mr-1.5" />
        {config.label}
      </span>
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
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: colors.backgroundGradient }}
      >
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin mx-auto" style={{ color: colors.accent }} />
          <p className="mt-6 font-medium text-lg" style={{ color: colors.textSecondary }}>
            Đang tải yêu cầu rút tiền...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 min-h-screen p-6" style={{ background: colors.backgroundGradient }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div
          className="p-8 rounded-2xl shadow-lg"
          style={{
            background: colors.cardBackground,
            borderLeftWidth: '4px',
            borderLeftColor: colors.accent,
          }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl shadow-lg" style={{ background: colors.accent }}>
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
                  Quản lý yêu cầu rút tiền
                </h1>
                <p className="mt-2" style={{ color: colors.textSecondary }}>
                  Duyệt và quản lý các yêu cầu rút tiền từ vendor
                </p>
              </div>
            </div>
            <Button
              onClick={() => refetch()}
              variant="outline"
              style={{ borderColor: colors.border }}
              className="hover:text-white transition-all"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card
          className="mb-6"
          style={{ background: colors.cardBackground, borderColor: colors.border }}
        >
          <CardHeader style={{ borderBottomColor: colors.border }}>
            <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
              <Filter className="w-5 h-5" />
              Bộ lọc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  Trạng thái
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setPage(1)
                  }}
                  className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: colors.border,
                    background: colors.background,
                    color: colors.text,
                  }}
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
        <Card style={{ background: colors.cardBackground, borderColor: colors.border }}>
          <CardHeader style={{ borderBottomColor: colors.border }}>
            <CardTitle style={{ color: colors.text }}>Danh sách yêu cầu rút tiền</CardTitle>
            <CardDescription style={{ color: colors.textSecondary }}>
              Tổng số: <span style={{ color: colors.accent, fontWeight: 'bold' }}>{meta?.total || 0}</span> yêu cầu | Trang{' '}
              <span style={{ color: colors.accent, fontWeight: 'bold' }}>{page}</span> /{' '}
              <span style={{ color: colors.accent, fontWeight: 'bold' }}>{meta?.totalPages || 1}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textSecondary }} />
                <p style={{ color: colors.textSecondary }}>Không có yêu cầu rút tiền nào</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request: any) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-4 transition-colors"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.cardBackgroundSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.hoverBackground
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-2xl font-bold" style={{ color: colors.accent }}>
                            {Number(request.amount).toLocaleString('vi-VN')} VND
                          </p>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm" style={{ color: colors.textSecondary }}>
                              Vendor
                            </p>
                            <p className="font-medium" style={{ color: colors.text }}>
                              {request.vendor?.businessName || request.vendorId}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm" style={{ color: colors.textSecondary }}>
                              Thông tin ngân hàng
                            </p>
                            <p className="font-medium" style={{ color: colors.text }}>
                              {request.bankName} - {request.bankAccountNumber}
                            </p>
                            <p className="text-sm" style={{ color: colors.textSecondary }}>
                              {request.accountHolderName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm" style={{ color: colors.textSecondary }}>
                              Ngày tạo
                            </p>
                            <p className="font-medium" style={{ color: colors.text }}>
                              {format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm', {
                                locale: vi,
                              })}
                            </p>
                          </div>
                          {request.approvedAt && (
                            <div>
                              <p className="text-sm" style={{ color: colors.textSecondary }}>
                                Ngày duyệt
                              </p>
                              <p className="font-medium" style={{ color: colors.text }}>
                                {format(new Date(request.approvedAt), 'dd/MM/yyyy HH:mm', {
                                  locale: vi,
                                })}
                              </p>
                            </div>
                          )}
                          {request.paidAt && (
                            <div>
                              <p className="text-sm" style={{ color: colors.textSecondary }}>
                                Ngày thanh toán
                              </p>
                              <p className="font-medium" style={{ color: colors.text }}>
                                {format(new Date(request.paidAt), 'dd/MM/yyyy HH:mm', {
                                  locale: vi,
                                })}
                              </p>
                            </div>
                          )}
                        </div>

                        {request.notes && (
                          <div className="mb-2">
                            <p className="text-sm" style={{ color: colors.textSecondary }}>
                              Ghi chú từ vendor:
                            </p>
                            <p className="text-sm" style={{ color: colors.text }}>
                              {request.notes}
                            </p>
                          </div>
                        )}

                        {request.adminNotes && (
                          <div className="mb-2">
                            <p className="text-sm font-medium" style={{ color: colors.accent }}>
                              Ghi chú từ admin:
                            </p>
                            <p className="text-sm" style={{ color: colors.text }}>
                              {request.adminNotes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => openActionDialog(request, 'approve')}
                              style={{
                                backgroundColor: colors.success,
                                color: 'white',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${colors.success}dd`
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.success
                              }}
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
                            style={{
                              backgroundColor: colors.accent,
                              color: 'white',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = colors.accentSecondary
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = colors.accent
                            }}
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
              <div
                className="flex items-center justify-between p-6 rounded-xl shadow-lg border-2 mt-6"
                style={{
                  background: colors.cardBackground,
                  borderColor: colors.border,
                }}
              >
                <p className="text-base font-medium" style={{ color: colors.text }}>
                  Trang{' '}
                  <span className="font-bold" style={{ color: colors.accent }}>
                    {page}
                  </span>{' '}
                  / <span className="font-bold" style={{ color: colors.accent }}>{meta.totalPages || 1}</span>
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="hover:text-white transition-all shadow-sm disabled:opacity-50"
                    style={{ borderColor: colors.border }}
                  >
                    Trước
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(meta.totalPages || 1, p + 1))}
                    disabled={page >= (meta.totalPages || 1)}
                    className="hover:text-white transition-all shadow-sm disabled:opacity-50"
                    style={{ borderColor: colors.border }}
                  >
                    Sau
                  </Button>
                </div>
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

