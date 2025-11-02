import {
  useGetVendorOrdersQuery,
  useGetOrderStatisticsQuery,
} from '@/services/vendor/vendor.service'
import { OrderFilters } from '@/services/vendor/vendor.types'

export const useVendorOrders = (filters?: OrderFilters) => {
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
    refetch,
  } = useGetVendorOrdersQuery(filters)
  const { data: statsData, isLoading: statsLoading } = useGetOrderStatisticsQuery()

  return {
    orders: ordersData?.data || [],
    meta: ordersData?.meta,
    statistics: statsData?.data,
    isLoading: ordersLoading,
    statsLoading,
    error: ordersError,
    refetch,
  }
}
