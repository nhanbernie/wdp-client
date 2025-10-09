'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Package, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function VendorDashboard() {
  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: '24',
      change: '+12%',
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Doanh thu tháng',
      value: '₫12.4M',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Đơn hàng mới',
      value: '156',
      change: '+23%',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Khách hàng',
      value: '1,234',
      change: '+5.1%',
      icon: Users,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ]

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Vendor</h1>
        <p className="text-muted-foreground">Chào mừng bạn đến với trang quản lý vendor</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`cart-card border rounded-xl p-6 ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-green-500">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="cart-card border rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border rounded-lg hover:bg-muted transition-colors">
            <Package className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium text-foreground">Thêm sản phẩm</h3>
            <p className="text-sm text-muted-foreground">Tạo sản phẩm mới</p>
          </button>
          <button className="p-4 text-left border rounded-lg hover:bg-muted transition-colors">
            <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-medium text-foreground">Xem báo cáo</h3>
            <p className="text-sm text-muted-foreground">Phân tích doanh thu</p>
          </button>
          <button className="p-4 text-left border rounded-lg hover:bg-muted transition-colors">
            <Users className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-medium text-foreground">Quản lý đơn hàng</h3>
            <p className="text-sm text-muted-foreground">Xử lý đơn hàng</p>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
