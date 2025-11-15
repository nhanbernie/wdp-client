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
import {
  Search,
  Calendar,
  ClipboardList,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { OrderStatus } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect } from 'react'

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
  const { colors } = useTheme()

  useEffect(() => {
    const styleId = 'order-select-theme-styles'
    let style = document.getElementById(styleId) as HTMLStyleElement

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    style.textContent = `
      [data-slot="select-content"] {
        background-color: ${colors.cardBackground} !important;
        border-color: ${colors.border}30 !important;
        color: ${colors.text} !important;
      }
      
      [data-slot="select-item"] {
        color: ${colors.text} !important;
      }
      
      [data-slot="select-item"]:hover,
      [data-slot="select-item"][data-highlighted] {
        background-color: ${colors.hoverBackground} !important;
        color: ${colors.text} !important;
      }
      
      [data-slot="select-item"][data-state="checked"] {
        background-color: ${colors.accent}15 !important;
      }
      
      [data-slot="select-trigger"] svg {
        color: ${colors.textSecondary} !important;
      }
      
      [data-slot="select-trigger"]:hover svg {
        color: ${colors.text} !important;
      }
    `

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [colors])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 p-6 rounded-lg"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
            style={{ color: colors.textSecondary }}
          />
          <Input
            placeholder="Tìm kiếm đơn hàng (mã đơn, sản phẩm)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-14 text-base rounded-2xl border transition-all"
            style={{
              borderColor: `${colors.border}30`,
              backgroundColor: colors.cardBackground,
              color: colors.text,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.accent
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = `${colors.border}30`
            }}
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger
            className="lg:w-[220px] h-14 rounded-2xl border text-base font-medium"
            style={{
              borderColor: `${colors.border}30`,
              backgroundColor: colors.cardBackground,
              color: colors.text,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${colors.border}50`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${colors.border}30`
            }}
          >
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent
            className="rounded-xl"
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: `${colors.border}30`,
            }}
          >
            <SelectItem value="all" className="text-base">
              <ClipboardList className="h-4 w-4 mr-2" style={{ color: colors.textSecondary }} />
              Tất cả trạng thái
            </SelectItem>
            <SelectItem value={OrderStatus.PENDING} className="text-base">
              <Clock className="h-4 w-4 mr-2" style={{ color: colors.textSecondary }} />
              Chờ xử lý
            </SelectItem>
            <SelectItem value={OrderStatus.PROCESSING} className="text-base">
              <Package className="h-4 w-4 mr-2" style={{ color: colors.textSecondary }} />
              Đang xử lý
            </SelectItem>
            <SelectItem value={OrderStatus.SHIPPING} className="text-base">
              <Truck className="h-4 w-4 mr-2" style={{ color: colors.textSecondary }} />
              Đang giao
            </SelectItem>
            <SelectItem value={OrderStatus.DELIVERED} className="text-base">
              <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.success }} />
              Đã giao
            </SelectItem>
            <SelectItem value={OrderStatus.COMPLETED} className="text-base">
              <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.success }} />
              Hoàn thành đơn hàng
            </SelectItem>
            <SelectItem value={OrderStatus.CANCELLED} className="text-base">
              <XCircle className="h-4 w-4 mr-2" style={{ color: colors.error }} />
              Đã hủy
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Date Sort */}
        <Select value={dateSort} onValueChange={onDateSortChange}>
          <SelectTrigger
            className="lg:w-[200px] h-14 rounded-2xl border text-base font-medium"
            style={{
              borderColor: `${colors.border}30`,
              backgroundColor: colors.cardBackground,
              color: colors.text,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${colors.border}50`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${colors.border}30`
            }}
          >
            {/* <Calendar
              className="h-5 w-5 mr-2"
              style={{ color: colors.textSecondary }}
            /> */}
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent
            className="rounded-xl"
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: `${colors.border}30`,
            }}
          >
            <SelectItem value="newest" className="text-base">
              <Calendar className="h-4 w-4 mr-2" style={{ color: colors.textSecondary }} />
              Mới nhất
            </SelectItem>
            <SelectItem value="oldest" className="text-base">
              <Calendar className="h-4 w-4 mr-2" style={{ color: colors.textSecondary }} />
              Cũ nhất
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}
