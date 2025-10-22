import { Loader2 } from 'lucide-react'
import useRevenueOvertime from '../hooks/useRevenueOvertime'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

const RevenueOvertimeChart = () => {
  const { data, isLoading, error } = useRevenueOvertime({
    month: undefined,
    year: undefined,
  })

  console.log('RevenueOvertimeChart data:', data)

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="w-full flex justify-end"></div>
      {/* Title chart */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
        Biểu đồ doanh thu theo thời gian
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-600 text-[0.8rem]">Đang tải dữ liệu...</span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-[0.8rem] text-center py-6">Lỗi tải dữ liệu biểu đồ</div>
      ) : !data?.data || !data.data?.data.length ? (
        <div className="text-gray-400 text-[0.8rem] text-center py-6">
          Không có dữ liệu để hiển thị
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data.data.data}
            margin={{ top: 40, right: 30, left: 20, bottom: 40 }} // top tăng để legend ko che chart
          >
            {/* Lưới chart */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            {/* Trục X */}
            <XAxis
              dataKey="period"
              tickFormatter={(value) => {
                const date = new Date(value)
                return data.data.granularity === 'month'
                  ? `Tháng ${date.getMonth() + 1}`
                  : `${date.getDate()}`
              }}
              tick={{ fontSize: 12, fill: '#374151' }}
              label={{
                value: data.data.granularity === 'month' ? 'Tháng' : 'Ngày',
                position: 'insideBottom',
                offset: -5,
                fontSize: 13,
                fill: '#111827',
              }}
            />

            {/* Trục Y */}
            <YAxis
              tickFormatter={(value) => formatCurrency(Number(value), 'VND')}
              tick={{ fontSize: 12, fill: '#374151' }}
              label={{
                value: 'Doanh thu (VND)',
                angle: -90,
                position: 'insideLeft',
                offset: -5,
                fontSize: 13,
                fill: '#111827',
              }}
            />

            {/* Tooltip */}
            <Tooltip
              formatter={(value: number) => formatCurrency(Number(value), 'VND')}
              labelFormatter={(label) => {
                const date = new Date(label)
                return data.data.granularity === 'month'
                  ? `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`
                  : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
              }}
            />

            {/* Legend */}
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{
                top: 0,
                left: 0,
                right: 0,
                lineHeight: '24px',
                fontSize: 13,
              }}
            />

            {/* Line chart */}
            <Line
              type="monotone"
              dataKey="revenue"
              name="Doanh thu"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default RevenueOvertimeChart
