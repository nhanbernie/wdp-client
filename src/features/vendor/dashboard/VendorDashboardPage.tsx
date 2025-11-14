'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useGetMyVendorProfileQuery } from '@/services/vendor/vendor.service'
import { useVendorOrders } from '@/features/vendor/orders'
import { useGetVendorProductsQuery } from '@/services/vendor/vendor.service'
import { WalletBalanceCard } from '@/features/vendor/wallet'
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
import { useTheme } from '@/contexts/ThemeContext'

export const VendorDashboardPage: React.FC = () => {
  const router = useRouter()
  const { colors } = useTheme()
  const { data: profileData, isLoading: profileLoading } = useGetMyVendorProfileQuery()
  const { statistics, isLoading: ordersLoading } = useVendorOrders()
  const { data: productsData, isLoading: productsLoading } = useGetVendorProductsQuery()

  const profile = profileData?.data
  const isLoading = profileLoading || ordersLoading || productsLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.accent }} />
      </div>
    )
  }

  const statusConfig = {
    pending: {
      label: 'Chờ phê duyệt',
      icon: AlertCircle,
      color: colors.warning,
      bgColor: `${colors.warning}20`,
    },
    approved: {
      label: 'Đã phê duyệt',
      icon: CheckCircle,
      color: colors.success,
      bgColor: `${colors.success}20`,
    },
    rejected: {
      label: 'Bị từ chối',
      icon: AlertCircle,
      color: colors.error,
      bgColor: `${colors.error}20`,
    },
    suspended: {
      label: 'Tạm ngưng',
      icon: AlertCircle,
      color: colors.warning,
      bgColor: `${colors.warning}20`,
    },
  }

  const status = profile ? statusConfig[profile.status] : null

  return (
    <div className="container mx-auto py-8 px-4">
      <div>
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2 flex items-center gap-3"
            style={{ color: colors.text }}
          >
            <LayoutDashboard className="w-8 h-8" style={{ color: colors.accent }} />
            Dashboard Vendor
          </h1>
          <p style={{ color: colors.textSecondary }}>Chào mừng trở lại, {profile?.businessName}</p>
        </div>

        {/* Profile Status Alert */}
        {profile && profile.status !== 'approved' && status && (
          <Card
            className="mb-6"
            style={{
              backgroundColor: colors.cardBackground,
              borderLeft: `4px solid ${status.color}`,
              borderColor: colors.border,
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <status.icon className="w-6 h-6 mt-1" style={{ color: status.color }} />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1" style={{ color: colors.text }}>
                    Trạng thái tài khoản: {status.label}
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
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

        {/* Wallet Balance Card - Hiển thị balance và banner cảnh báo */}
        {profile && profile.status === 'approved' && (
          <div className="mb-6">
            <WalletBalanceCard />
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push('/vendor/product-management')}
            style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                Sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" style={{ color: colors.accent }} />
                  <span className="text-2xl font-bold" style={{ color: colors.text }}>
                    {productsData?.data?.items?.length || 0}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push('/vendor/orders')}
            style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                Đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" style={{ color: colors.success }} />
                  <span className="text-2xl font-bold" style={{ color: colors.text }}>
                    {statistics?.totalOrders || 0}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                Doanh thu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" style={{ color: colors.accent }} />
                <span className="text-2xl font-bold" style={{ color: colors.text }}>
                  {statistics?.totalRevenue ? statistics.totalRevenue.toLocaleString('vi-VN') : '0'}{' '}
                  VND
                </span>
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                Khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: colors.warning }} />
                <span className="text-2xl font-bold" style={{ color: colors.text }}>
                  {statistics?.totalCustomers || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Status Overview */}
        {statistics && statistics.ordersByStatus && (
          <Card
            className="mb-6"
            style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
          >
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Tình trạng đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                <StatCard
                  label="Chờ xác nhận"
                  value={statistics.ordersByStatus.pending}
                  color="warning"
                  colors={colors}
                />
                <StatCard
                  label="Đang xử lý"
                  value={statistics.ordersByStatus.processing}
                  color="accent"
                  colors={colors}
                />
                <StatCard
                  label="Đang giao"
                  value={statistics.ordersByStatus.shipping}
                  color="success"
                  colors={colors}
                />
                <StatCard
                  label="Đã giao"
                  value={statistics.ordersByStatus.delivered}
                  color="success"
                  colors={colors}
                />
                <StatCard
                  label="Đã hủy"
                  value={statistics.ordersByStatus.cancelled}
                  color="error"
                  colors={colors}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Products & Customers */}
        {statistics && (statistics.topProducts?.length > 0 || statistics.customers?.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Top Products */}
            {statistics.topProducts && statistics.topProducts.length > 0 && (
              <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: colors.text }}>Sản phẩm bán chạy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statistics.topProducts.map((product, index) => (
                      <div key={product.productId} className="flex items-center gap-3">
                        <div
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                          style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
                        >
                          {index + 1}
                        </div>
                        <img
                          src={product.thumbnail}
                          alt={product.productName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate" style={{ color: colors.text }}>
                            {product.productName}
                          </p>
                          <p className="text-sm" style={{ color: colors.textSecondary }}>
                            Đã bán: {product.totalQuantity} | Doanh thu:{' '}
                            {product.totalRevenue.toLocaleString('vi-VN')} VND
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Customers */}
            {statistics.customers && statistics.customers.length > 0 && (
              <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: colors.text }}>
                    Khách hàng ({statistics.totalCustomers})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {statistics.customers.map((customer) => (
                      <div
                        key={customer.userId}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: colors.cardBackgroundSecondary }}
                      >
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold"
                          style={{
                            backgroundColor: colors.accent,
                            color: colors.background,
                          }}
                        >
                          {customer.name ? customer.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium" style={{ color: colors.text }}>
                            {customer.name || 'Chưa cập nhật'}
                          </p>
                          <p className="text-sm truncate" style={{ color: colors.textSecondary }}>
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
          <CardHeader>
            <CardTitle style={{ color: colors.text }}>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => router.push('/vendor/product-management')}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              >
                <Package className="w-6 h-6" />
                <span>Quản lý sản phẩm</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => router.push('/vendor/quotes')}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              >
                <TrendingUp className="w-6 h-6" />
                <span>Yêu cầu báo giá</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => router.push('/vendor/profile')}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              >
                <CheckCircle className="w-6 h-6" />
                <span>Cập nhật thông tin</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number
  color: 'warning' | 'accent' | 'info' | 'success' | 'error'
  colors: any
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, colors: themeColors }) => {
  const colorMap = {
    warning: themeColors.warning,
    accent: themeColors.accent,
    info: themeColors.info,
    success: themeColors.success,
    error: themeColors.error,
  }

  const selectedColor = colorMap[color]

  return (
    <div
      className="p-4 rounded-lg border-2"
      style={{
        backgroundColor: `${selectedColor}20`,
        borderColor: selectedColor,
        color: selectedColor,
      }}
    >
      <p className="text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}
