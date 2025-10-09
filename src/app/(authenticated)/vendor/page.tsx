'use client'

import AICManageLayout from '@/components/layouts/AICManageLayout'

export default function VendorPage() {
  return (
    <AICManageLayout userRole="vendor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Quản lý sản phẩm và đơn hàng của bạn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold">Sản phẩm</h3>
            <p className="text-3xl font-bold text-primary">156</p>
            <p className="text-sm text-muted-foreground">+12 tháng này</p>
          </div>
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold">Đơn hàng</h3>
            <p className="text-3xl font-bold text-primary">89</p>
            <p className="text-sm text-muted-foreground">+8 tuần này</p>
          </div>
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold">Doanh thu</h3>
            <p className="text-3xl font-bold text-primary">₫2.3M</p>
            <p className="text-sm text-muted-foreground">+15% tháng này</p>
          </div>
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold">Đánh giá</h3>
            <p className="text-3xl font-bold text-primary">4.8</p>
            <p className="text-sm text-muted-foreground">Dựa trên 234 đánh giá</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Đơn hàng #AIC123456</p>
                  <p className="text-sm text-muted-foreground">2 giờ trước</p>
                </div>
                <span className="text-sm font-medium text-primary">₫450,000</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Đơn hàng #AIC123457</p>
                  <p className="text-sm text-muted-foreground">4 giờ trước</p>
                </div>
                <span className="text-sm font-medium text-primary">₫320,000</span>
              </div>
            </div>
          </div>

          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Sản phẩm bán chạy</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Xi măng Portland PCB40</p>
                  <p className="text-sm text-muted-foreground">45 đã bán</p>
                </div>
                <span className="text-sm font-medium text-primary">₫165,000</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Máy khoan búa Bosch</p>
                  <p className="text-sm text-muted-foreground">12 đã bán</p>
                </div>
                <span className="text-sm font-medium text-primary">₫4,500,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AICManageLayout>
  )
}
