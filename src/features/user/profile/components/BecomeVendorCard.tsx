'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Store, Loader2, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  vendorRegistrationSchema,
  VendorRegistrationFormData,
} from '../schemas/vendor-registration.schema'
import {
  useCreateVendorMutation,
  useGetVendorApplicationStatusQuery,
} from '@/services/vendor/vendor.service'
import { useToast } from '@/hooks/useToast'

export const BecomeVendorCard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    data: vendorData,
    isLoading: vendorLoading,
    refetch,
  } = useGetVendorApplicationStatusQuery()
  const [createVendor, { isLoading: isCreating }] = useCreateVendorMutation()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VendorRegistrationFormData>({
    resolver: zodResolver(vendorRegistrationSchema),
  })

  const vendorProfile = vendorData?.data

  const onSubmit = async (data: VendorRegistrationFormData) => {
    try {
      await createVendor(data).unwrap()
      toast.success(
        'Thành công',
        'Đăng ký vendor thành công! Vui lòng đợi quản trị viên phê duyệt.',
      )
      setIsDialogOpen(false)
      reset()
      // Refetch application status to get updated data
      refetch()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Đăng ký vendor thất bại')
    }
  }

  const statusConfig = {
    pending: {
      label: 'Chờ phê duyệt',
      icon: Clock,
      className: 'bg-yellow-100 text-yellow-800',
      description: 'Đơn đăng ký của bạn đang chờ được phê duyệt',
    },
    approved: {
      label: 'Đã phê duyệt',
      icon: CheckCircle,
      className: 'bg-green-100 text-green-800',
      description: 'Tài khoản vendor của bạn đã được kích hoạt',
    },
    rejected: {
      label: 'Bị từ chối',
      icon: XCircle,
      className: 'bg-red-100 text-red-800',
      description: 'Đơn đăng ký của bạn đã bị từ chối',
    },
    suspended: {
      label: 'Tạm ngưng',
      icon: AlertCircle,
      className: 'bg-orange-100 text-orange-800',
      description: 'Tài khoản vendor của bạn đang bị tạm ngưng',
    },
  }

  if (vendorLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5 text-blue-600" />
            Tài khoản Vendor
          </CardTitle>
        </CardHeader>
        <CardContent>
          {vendorProfile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Trạng thái Vendor</span>
                <Badge className={statusConfig[vendorProfile.status].className}>
                  {statusConfig[vendorProfile.status].label}
                </Badge>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  {React.createElement(statusConfig[vendorProfile.status].icon, {
                    className: 'w-5 h-5 mt-0.5',
                  })}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{vendorProfile.businessName}</p>
                    <p className="text-sm text-gray-600">
                      {statusConfig[vendorProfile.status].description}
                    </p>
                  </div>
                </div>
              </div>

              {vendorProfile.status === 'approved' && (
                <Button
                  className="w-full"
                  onClick={() => (window.location.href = '/vendor/dashboard')}
                >
                  Đi tới Dashboard Vendor
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Trở thành vendor để bán sản phẩm của bạn trên nền tảng của chúng tôi
              </p>
              <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
                <Store className="w-4 h-4 mr-2" />
                Đăng ký làm Vendor
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Đăng ký làm Vendor</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mt-5">
              <Label htmlFor="businessName">Tên doanh nghiệp *</Label>
              <Input id="businessName" {...register('businessName')} />
              {errors.businessName && (
                <p className="text-sm text-red-600 mt-1">{errors.businessName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="businessDescription">Mô tả doanh nghiệp *</Label>
              <Textarea id="businessDescription" {...register('businessDescription')} rows={3} />
              {errors.businessDescription && (
                <p className="text-sm text-red-600 mt-1">{errors.businessDescription.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="businessAddress">Địa chỉ doanh nghiệp *</Label>
              <Input id="businessAddress" {...register('businessAddress')} />
              {errors.businessAddress && (
                <p className="text-sm text-red-600 mt-1">{errors.businessAddress.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessPhone">Số điện thoại *</Label>
                <Input id="businessPhone" {...register('businessPhone')} />
                {errors.businessPhone && (
                  <p className="text-sm text-red-600 mt-1">{errors.businessPhone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="businessEmail">Email doanh nghiệp *</Label>
                <Input id="businessEmail" type="email" {...register('businessEmail')} />
                {errors.businessEmail && (
                  <p className="text-sm text-red-600 mt-1">{errors.businessEmail.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessLicense">Số giấy phép kinh doanh *</Label>
                <Input id="businessLicense" {...register('businessLicense')} />
                {errors.businessLicense && (
                  <p className="text-sm text-red-600 mt-1">{errors.businessLicense.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="taxId">Mã số thuế *</Label>
                <Input id="taxId" {...register('taxId')} />
                {errors.taxId && (
                  <p className="text-sm text-red-600 mt-1">{errors.taxId.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  reset()
                }}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  'Gửi đăng ký'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
