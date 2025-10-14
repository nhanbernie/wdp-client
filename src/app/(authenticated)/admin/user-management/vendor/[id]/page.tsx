'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, Ban, Mail, Phone, MapPin, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  useGetVendorByIdQuery,
  useApproveVendorMutation,
  useRejectVendorMutation,
  useSuspendVendorMutation,
} from '@/services/vendor/vendor.service'
import { toast } from 'sonner'

export default function VendorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vendorId = params.id as string

  const { data: vendorData, isLoading, refetch } = useGetVendorByIdQuery(vendorId)
  const [approveVendor, { isLoading: approving }] = useApproveVendorMutation()
  const [rejectVendor, { isLoading: rejecting }] = useRejectVendorMutation()
  const [suspendVendor, { isLoading: suspending }] = useSuspendVendorMutation()

  const vendor = vendorData?.data

  const handleApprove = async () => {
    try {
      await approveVendor(vendorId).unwrap()
      toast.success('Đã phê duyệt vendor thành công!')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Phê duyệt thất bại!')
    }
  }

  const handleReject = async () => {
    try {
      await rejectVendor(vendorId).unwrap()
      toast.success('Đã từ chối vendor!')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Từ chối thất bại!')
    }
  }

  const handleSuspend = async () => {
    try {
      await suspendVendor(vendorId).unwrap()
      toast.success('Đã đình chỉ vendor!')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Đình chỉ thất bại!')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Đã duyệt</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Chờ duyệt</Badge>
      case 'rejected':
        return <Badge variant="destructive">Từ chối</Badge>
      case 'suspended':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Đình chỉ</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Không tìm thấy vendor</p>
          <Button onClick={() => router.back()}>Quay lại</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{vendor.businessName}</h1>
            <p className="text-muted-foreground mt-1">Chi tiết thông tin vendor</p>
          </div>
          {getStatusBadge(vendor.status)}
        </div>
      </motion.div>

      <div className="grid gap-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin doanh nghiệp</CardTitle>
            <CardDescription>Thông tin chi tiết về doanh nghiệp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Tên doanh nghiệp</p>
                <p className="text-base text-foreground">{vendor.businessName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Mã số thuế</p>
                <p className="text-base text-foreground">{vendor.taxId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Giấy phép kinh doanh
                </p>
                <p className="text-base text-foreground">{vendor.businessLicense}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Trạng thái</p>
                {getStatusBadge(vendor.status)}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Mô tả doanh nghiệp</p>
              <p className="text-base text-foreground leading-relaxed">
                {vendor.businessDescription}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base text-foreground">{vendor.businessEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Số điện thoại</p>
                <p className="text-base text-foreground">{vendor.businessPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Địa chỉ</p>
                <p className="text-base text-foreground">{vendor.businessAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {vendor.status === 'pending' && (
          <Card className="border-yellow-500/50">
            <CardHeader>
              <CardTitle>Phê duyệt vendor</CardTitle>
              <CardDescription>
                Xem xét và phê duyệt hoặc từ chối đăng ký vendor này
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button
                  onClick={handleApprove}
                  disabled={approving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Phê duyệt
                </Button>
                <Button onClick={handleReject} disabled={rejecting} variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Từ chối
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {vendor.status === 'approved' && (
          <Card className="border-orange-500/50">
            <CardHeader>
              <CardTitle>Đình chỉ vendor</CardTitle>
              <CardDescription>Đình chỉ hoạt động của vendor này</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleSuspend}
                disabled={suspending}
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <Ban className="mr-2 h-4 w-4" />
                Đình chỉ
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
