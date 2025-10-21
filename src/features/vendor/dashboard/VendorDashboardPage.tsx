'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useGetMyVendorProfileQuery } from '@/services/vendor/vendor.service'
import { useVendorOrders } from '@/features/vendor/orders'
import { useGetVendorProductsQuery } from '@/services/vendor/vendor.service'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export const VendorDashboardPage: React.FC = () => {
  const router = useRouter()
  const { data: profileData, isLoading: profileLoading } = useGetMyVendorProfileQuery()
  const { statistics, isLoading: ordersLoading } = useVendorOrders()
  const { data: productsData, isLoading: productsLoading } = useGetVendorProductsQuery()

  const profile = profileData?.data
  const isLoading = profileLoading || ordersLoading || productsLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const statusConfig = {
    pending: {
      label: 'Chờ phê duyệt',
      icon: AlertCircle,
      className: 'bg-yellow-100 text-yellow-800',
    },
    approved: {
      label: 'Đã phê duyệt',
      icon: CheckCircle,
      className: 'bg-green-100 text-green-800',
    },
    rejected: { label: 'Bị từ chối', icon: AlertCircle, className: 'bg-red-100 text-red-800' },
    suspended: {
      label: 'Tạm ngưng',
      icon: AlertCircle,
      className: 'bg-orange-100 text-orange-800',
    },
  }

  const status = profile ? statusConfig[profile.status] : null

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            Dashboard Vendor
          </h1>
          <p className="text-gray-600">Chào mừng trở lại, {profile?.businessName}</p>
        </div>

        {/* Profile Status Alert */}
        {profile && profile.status !== 'approved' && status && (
          <Card className="mb-6 border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <status.icon className="w-6 h-6 text-yellow-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Trạng thái tài khoản: {status.label}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {profile.status === 'pending' &&
                      'Tài khoản của bạn đang chờ được phê duyệt. Vui lòng đợi quản trị viên xem xét.'}
                    {profile.status === 'rejected' &&
                      'Tài khoản của bạn đã bị từ chối. Vui lòng liên hệ với quản trị viên.'}
                    {profile.status === 'suspended' &&
                      'Tài khoản của bạn đang bị tạm ngưng. Vui lòng liên hệ với quản trị viên.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push('/vendor/product-management')}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl font-bold">
                    {productsData?.data?.items?.length || 0}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push('/vendor/orders')}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold">{statistics?.totalOrders || 0}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Doanh thu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <span className="text-3xl font-bold text-purple-600">
                  {statistics?.totalRevenue
                    ? parseInt(statistics.totalRevenue).toLocaleString('vi-VN')
                    : '0'}{' '}
                  VND
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Status Overview */}
        {statistics && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tình trạng đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                <StatCard label="Chờ xác nhận" value={statistics.byStatus.pending} color="yellow" />
                <StatCard label="Đã xác nhận" value={statistics.byStatus.confirmed} color="blue" />
                <StatCard label="Đang giao" value={statistics.byStatus.shipping} color="purple" />
                <StatCard label="Đã giao" value={statistics.byStatus.delivered} color="green" />
                <StatCard label="Đã hủy" value={statistics.byStatus.cancelled} color="red" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => router.push('/vendor/product-management')}
              >
                <Package className="w-6 h-6" />
                <span>Quản lý sản phẩm</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => router.push('/vendor/quotes')}
              >
                <TrendingUp className="w-6 h-6" />
                <span>Yêu cầu báo giá</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => router.push('/vendor/profile')}
              >
                <CheckCircle className="w-6 h-6" />
                <span>Cập nhật thông tin</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number
  color: 'yellow' | 'blue' | 'purple' | 'green' | 'red'
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => {
  const colorClasses = {
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <div className={`p-4 rounded-lg border-2 ${colorClasses[color]}`}>
      <p className="text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}
