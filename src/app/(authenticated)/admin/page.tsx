'use client'

import OrdersByStatusChart from '@/features/admin/overview/components/OrdersByStatusChart'
import RevenueOvertimeChart from '@/features/admin/overview/components/RevenueOvertimeChart'

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Quản lý hệ thống và người dùng</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 border border-border rounded-lg">
          <h3 className="text-lg font-semibold">Tổng người dùng</h3>
          <p className="text-3xl font-bold text-primary">1,234</p>
        </div>
        <div className="p-6 border border-border rounded-lg">
          <h3 className="text-lg font-semibold">Đơn hàng hôm nay</h3>
          <p className="text-3xl font-bold text-primary">56</p>
        </div>
        <div className="p-6 border border-border rounded-lg">
          <h3 className="text-lg font-semibold">Doanh thu</h3>
          <p className="text-3xl font-bold text-primary">₫12.5M</p>
        </div>
        <div className="p-6 border border-border rounded-lg">
          <h3 className="text-lg font-semibold">Sản phẩm</h3>
          <p className="text-3xl font-bold text-primary">2,847</p>
        </div>
      </div>

      <div className="mb-10 w-full">
        <RevenueOvertimeChart />
        <OrdersByStatusChart />
      </div>
    </div>
  )
}
