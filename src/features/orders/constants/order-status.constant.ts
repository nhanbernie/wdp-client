import { Clock, Package, Truck, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { OrderStatus } from '@/services/orders/types'
import { LucideIcon } from 'lucide-react'

type StatusConfig = {
  label: string
  className: string
  icon: LucideIcon
  step: number
  bgColor: string
  progressColor: string
  ringColor: string
}

export const statusConfig: Record<OrderStatus, StatusConfig> = {
  [OrderStatus.PENDING]: {
    label: 'Chờ xử lý',
    className:
      'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:shadow-xl border-2 border-white/50',
    icon: Clock,
    step: 1,
    bgColor: 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50',
    progressColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
    ringColor: 'ring-amber-500/30',
  },
  [OrderStatus.PROCESSING]: {
    label: 'Đang xử lý',
    className:
      'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:shadow-xl border-2 border-white/50',
    icon: Package,
    step: 2,
    bgColor: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50',
    progressColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    ringColor: 'ring-blue-500/30',
  },
  [OrderStatus.ADMIN_CONFIRMED]: {
    label: 'Đã xác nhận',
    className:
      'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:shadow-xl border-2 border-white/50',
    icon: Package,
    step: 2,
    bgColor: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50',
    progressColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    ringColor: 'ring-blue-500/30',
  },
  [OrderStatus.SHIPPING]: {
    label: 'Đang giao',
    className:
      'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:shadow-xl border-2 border-white/50',
    icon: Truck,
    step: 3,
    bgColor: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50',
    progressColor: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    ringColor: 'ring-indigo-500/30',
  },
  [OrderStatus.DELIVERED]: {
    label: 'Đã giao',
    className:
      'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:shadow-xl border-2 border-white/50',
    icon: CheckCircle,
    step: 4,
    bgColor: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50',
    progressColor: 'bg-gradient-to-r from-emerald-500 to-green-600',
    ringColor: 'ring-emerald-500/30',
  },
  [OrderStatus.COMPLETED]: {
    label: 'Hoàn thành đơn hàng',
    className:
      'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:shadow-xl border-2 border-white/50',
    icon: CheckCircle,
    step: 5,
    bgColor: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50',
    progressColor: 'bg-gradient-to-r from-emerald-500 to-green-600',
    ringColor: 'ring-emerald-500/30',
  },
  [OrderStatus.CANCELLED]: {
    label: 'Đã hủy',
    className:
      'bg-gradient-to-r from-red-500 via-rose-500 to-red-600 hover:shadow-xl border-2 border-white/50',
    icon: XCircle,
    step: 0,
    bgColor: 'bg-gradient-to-br from-red-50 via-rose-50 to-red-50',
    progressColor: 'bg-gradient-to-r from-red-500 to-rose-600',
    ringColor: 'ring-red-500/30',
  },
  [OrderStatus.REFUNDED]: {
    label: 'Hoàn tiền',
    className:
      'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 hover:shadow-xl border-2 border-white/50',
    icon: RotateCcw,
    step: 0,
    bgColor: 'bg-gradient-to-br from-purple-50 via-fuchsia-50 to-purple-50',
    progressColor: 'bg-gradient-to-r from-purple-500 to-fuchsia-600',
    ringColor: 'ring-purple-500/30',
  },
}

export const orderSteps = [
  { id: 1, name: 'Chờ xử lý', status: OrderStatus.PENDING },
  { id: 2, name: 'Đang xử lý', status: OrderStatus.PROCESSING },
  { id: 3, name: 'Đang giao', status: OrderStatus.SHIPPING },
  { id: 4, name: 'Đã giao', status: OrderStatus.DELIVERED },
  { id: 5, name: 'Hoàn thành đơn hàng', status: OrderStatus.COMPLETED },
]
