import { useGetOrdersByStatusQuery } from '@/services/orders/orders.service'

const useOrdersByStatus = () => {
  const { data, error, isLoading } = useGetOrdersByStatusQuery()

  return {
    data: data?.data,
    error,
    isLoading,
  }
}

export default useOrdersByStatus
