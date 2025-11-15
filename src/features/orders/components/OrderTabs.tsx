'use client'

import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClipboardList, Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react'
import { OrderStatus } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect } from 'react'

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
  const { colors } = useTheme()

  useEffect(() => {
    const styleId = 'order-tabs-theme-styles'
    let style = document.getElementById(styleId) as HTMLStyleElement

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    style.textContent = `
      [data-order-tabs-list] {
        background: ${colors.cardBackgroundSecondary} !important;
        border-color: ${colors.border} !important;
      }
      
      [data-order-tabs-list] button[data-state="active"] {
        background: ${colors.accent} !important;
        background-image: none !important;
        background-color: ${colors.accent} !important;
        color: white !important;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
      }
      
      [data-order-tabs-list] button[data-state="inactive"] {
        background: transparent !important;
        background-image: none !important;
        background-color: transparent !important;
        color: ${colors.textSecondary} !important;
      }
      
      [data-order-tabs-list] button[data-state="inactive"]:hover {
        background: ${colors.hoverBackground} !important;
        background-image: none !important;
        background-color: ${colors.hoverBackground} !important;
      }
      
      [data-order-tabs-list] button[data-state="inactive"] svg {
        color: ${colors.textSecondary} !important;
      }
      [data-order-tabs-list] button[data-state="active"] svg {
        color: white !important;
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
    <TabsList
      className="grid grid-cols-2 lg:grid-cols-6 gap-2 p-2 rounded-2xl h-auto border"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
        borderColor: colors.border,
      }}
      data-order-tabs-list
    >
      <TabsTrigger value="all" className="h-14 rounded-xl text-base font-bold transition-all">
        <ClipboardList className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Tất cả</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{counts.all}</span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.PENDING}
        className="h-14 rounded-xl text-base font-bold transition-all"
      >
        <Clock className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Chờ</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{counts.pending}</span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.PROCESSING}
        className="h-14 rounded-xl text-base font-bold transition-all"
      >
        <Package className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Xử lý</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
          {counts.processing}
        </span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.SHIPPING}
        className="h-14 rounded-xl text-base font-bold transition-all"
      >
        <Truck className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Giao</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">{counts.shipping}</span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.DELIVERED}
        className="h-14 rounded-xl text-base font-bold transition-all"
      >
        <CheckCircle className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Giao</span>
        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
          {counts.delivered}
        </span>
      </TabsTrigger>

      <TabsTrigger
        value={OrderStatus.CANCELLED}
        className="h-14 rounded-xl text-base font-bold transition-all"
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
