import React from 'react'
import type { OrderListItem } from '../../types'
import { StatusBadge } from './StatusBadge'
import { Button } from '@/components/ui/button'
import { Eye, ShoppingBag, Calendar, DollarSign } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { motion } from 'framer-motion'

interface OrdersTableProps {
  orders: OrderListItem[]
  onViewDetails: (orderId: string) => void
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewDetails }) => {
  return (
    <div className="rounded-2xl border-2 border-purple-200 shadow-xl overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
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
          {orders.map((order, index) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-purple-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
            >
              <TableCell className="text-sm font-mono text-gray-600 group-hover:text-blue-600 transition-colors">
                {order.id.slice(0, 8)}...
              </TableCell>
              <TableCell className="text-sm text-gray-700 font-medium">{order.userEmail}</TableCell>
              <TableCell className="text-sm font-bold">
                <span className="flex items-center gap-1 text-blue-600">
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
                <span className="flex items-center justify-center gap-1 text-sm font-semibold text-purple-600">
                  <ShoppingBag className="h-4 w-4" />
                  {order.itemsCount}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(order.id)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-110 transition-all duration-200 shadow-md"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
