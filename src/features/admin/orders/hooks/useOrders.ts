import { useState, useEffect } from 'react'
import { ordersService } from '@/services/admin'
import { useAdminConfirmOrderMutation, useCompleteOrderMutation } from '@/services/orders/orders.service'
import { useToast } from '@/hooks/useToast'
import type { OrderListItem, OrderListParams, OrderDetails } from '../../types'

export const useOrders = (params?: OrderListParams) => {
  const [orders, setOrders] = useState<OrderListItem[]>([])
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await ordersService.getOrders(params)
      setOrders(response.data)
      setMeta(response.meta)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [params?.page, params?.limit, params?.status, params?.sortBy, params?.order])

  return {
    orders,
    meta,
    loading,
    error,
    refetch: fetchOrders,
  }
}

export const useOrderDetails = (orderId: string) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ordersService.getOrderDetails(orderId)
      setOrderDetails(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  return {
    orderDetails,
    loading,
    error,
    refetch: fetchOrderDetails,
  }
}

export const useOrderActions = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()
  const [adminConfirmOrder] = useAdminConfirmOrderMutation()
  const [completeOrder] = useCompleteOrderMutation()

  const updateStatus = async (orderId: string, status: string) => {
    try {
      setLoading(true)
      setError(null)

      if (status === 'admin_confirm') {
        await adminConfirmOrder(orderId).unwrap()
        toast.success('Xác nhận đơn hàng thành công')
        return true
      }

      if (status === 'complete') {
        await completeOrder(orderId).unwrap()
        toast.success('Hoàn thành đơn hàng thành công')
        return true
      }

      await ordersService.updateOrderStatus(orderId, { status })
      return true
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to update order status'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  const cancelOrder = async (orderId: string, reason: string, refund = false) => {
    try {
      setLoading(true)
      setError(null)
      await ordersService.cancelOrder(orderId, { reason, refund })
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    updateStatus,
    cancelOrder,
    loading,
    error,
  }
}
