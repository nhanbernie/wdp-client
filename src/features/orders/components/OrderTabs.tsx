'use client'

import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClipboardList, Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react'
import { OrderStatus } from '@/services/orders/types'

interface OrderTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
  counts: {
    all: number
    pending: number
    processing: number
    shipping: number
    delivered: number
    cancelled: number
  }
}

export function OrderTabs({ activeTab, onTabChange, counts }: OrderTabsProps) {
  return (
    <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-2 bg-slate-100 p-2 rounded-2xl h-auto">
      <TabsTrigger
        value="all"
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-xl h-14 rounded-xl text-base font-bold transition-all"
      >
        <ClipboardList className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Tất cả</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{counts.all}</span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.PENDING}
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-xl h-14 rounded-xl text-base font-bold transition-all"
      >
        <Clock className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Chờ</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{counts.pending}</span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.PROCESSING}
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-xl h-14 rounded-xl text-base font-bold transition-all"
      >
        <Package className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Xử lý</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
          {counts.processing}
        </span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.SHIPPING}
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-xl h-14 rounded-xl text-base font-bold transition-all"
      >
        <Truck className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Giao</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{counts.shipping}</span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.DELIVERED}
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-xl h-14 rounded-xl text-base font-bold transition-all"
      >
        <CheckCircle className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Giao</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
          {counts.delivered}
        </span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.CANCELLED}
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-xl h-14 rounded-xl text-base font-bold transition-all"
      >
        <XCircle className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Hủy</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
          {counts.cancelled}
        </span>
      </TabsTrigger>
    </TabsList>
  )
}
