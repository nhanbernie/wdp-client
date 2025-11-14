import React from 'react'
import type { OrderListItem } from '../../types'
import { StatusBadge } from './StatusBadge'
import { Button } from '@/components/ui/button'
import { Eye, ShoppingBag, DollarSign } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTheme } from '@/contexts/ThemeContext'

interface OrdersTableProps {
  orders: OrderListItem[]
  onViewDetails: (orderId: string) => void
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewDetails }) => {
  const { colors } = useTheme()

  return (
    <div
      className="rounded-2xl shadow-xl overflow-hidden"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
        border: `1px solid ${colors.border}30`,
        boxShadow: `0 4px 12px ${colors.border}20`,
      }}
    >
      <Table>
        <TableHeader>
          <TableRow style={{ background: colors.accent }}>
            <TableHead className="font-bold text-sm text-white">ID</TableHead>
            <TableHead className="font-bold text-sm text-white">Email</TableHead>
            <TableHead className="font-bold text-sm text-white">Tổng tiền</TableHead>
            <TableHead className="font-bold text-sm text-white">Trạng thái</TableHead>
            <TableHead className="font-bold text-sm text-white">Thanh toán</TableHead>
            <TableHead className="font-bold text-sm text-white">Số sản phẩm</TableHead>
            <TableHead className="font-bold text-sm text-white text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:opacity-80 transition-colors"
              style={{ borderBottomWidth: '1px', borderBottomColor: colors.border }}
            >
              <TableCell className="text-sm font-mono" style={{ color: colors.textSecondary }}>
                {order.id.slice(0, 8)}...
              </TableCell>
              <TableCell className="text-sm font-medium" style={{ color: colors.text }}>
                {order.userEmail}
              </TableCell>
              <TableCell className="text-sm font-bold">
                <span className="flex items-center gap-1" style={{ color: colors.text }}>
                  <DollarSign className="h-4 w-4" />
                  {parseFloat(order.totalAmount).toLocaleString('vi-VN')} VND
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge status={order.status} type="order" />
              </TableCell>
              <TableCell>
                <StatusBadge status={order.paymentStatus} type="payment" />
              </TableCell>
              <TableCell>
                <span
                  className="flex items-center justify-center gap-1 text-sm font-semibold"
                  style={{ color: colors.accent }}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {order.itemsCount}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(order.id)}
                  className="shadow-md"
                  style={{ background: colors.accent, color: '#fff' }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
