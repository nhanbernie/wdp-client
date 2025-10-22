import { useRevenueOvertimeEndpointQuery } from '@/services/admin/admin.service'

const useRevenueOvertime = (prop: { month?: number; year?: number } | undefined) => {
  const { data, isLoading, error } = useRevenueOvertimeEndpointQuery({
    month: prop?.month,
    year: prop?.year,
  })

  return {
    data,
    isLoading,
    error,
  }
}

export default useRevenueOvertime
