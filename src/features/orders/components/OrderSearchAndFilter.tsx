'use client'

import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Calendar } from 'lucide-react'
import { OrderStatus } from '@/services/orders/types'

interface OrderSearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  dateSort: string
  onDateSortChange: (value: string) => void
}

export function OrderSearchAndFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateSort,
  onDateSortChange,
}: OrderSearchAndFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 p-6 bg-white rounded-2xl shadow-xl border-2 border-slate-200"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Tìm kiếm đơn hàng (mã đơn, sản phẩm)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-14 text-base rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="lg:w-[220px] h-14 rounded-2xl border-2 border-slate-200 text-base font-medium">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="text-base">
              📋 Tất cả trạng thái
            </SelectItem>
            <SelectItem value={OrderStatus.PENDING} className="text-base">
              ⏳ Chờ xử lý
            </SelectItem>
            <SelectItem value={OrderStatus.PROCESSING} className="text-base">
              📦 Đang xử lý
            </SelectItem>
            <SelectItem value={OrderStatus.SHIPPING} className="text-base">
              🚚 Đang giao
            </SelectItem>
            <SelectItem value={OrderStatus.DELIVERED} className="text-base">
              ✅ Đã giao
            </SelectItem>
            <SelectItem value={OrderStatus.CANCELLED} className="text-base">
              ❌ Đã hủy
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Date Sort */}
        <Select value={dateSort} onValueChange={onDateSortChange}>
          <SelectTrigger className="lg:w-[200px] h-14 rounded-2xl border-2 border-slate-200 text-base font-medium">
            <Calendar className="h-5 w-5 mr-2" />
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="newest" className="text-base">
              📅 Mới nhất
            </SelectItem>
            <SelectItem value="oldest" className="text-base">
              📆 Cũ nhất
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}
