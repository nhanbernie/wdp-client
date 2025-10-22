import { Loader2 } from 'lucide-react'
import useOrdersByStatus from '../hooks/useOrdersByStatus'
import { Cell, Pie, ResponsiveContainer, PieChart, Legend, Tooltip } from 'recharts'

const COLORS = ['#60a5fa', '#fbbf24', '#34d399', '#f87171', '#a78bfa']
const LABEL: Record<string, string> = {
  cancelled: 'Đã hủy',
  delivered: 'Đã giao',
  pending: 'Đang xử lý',
  shipping: 'Đang giao hàng',
}

const OrdersByStatusChart = () => {
  const { data, isLoading, error } = useOrdersByStatus()

  return (
    <div className="h-96 w-full p-6 mt-8 bg-white rounded-2xl shadow-sm flex flex-col items-center">
      {/* Tiêu đề */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Biểu đồ đơn hàng theo trạng thái</h2>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-600 text-sm">Đang tải dữ liệu...</span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm text-center flex-1 flex items-center justify-center">
          Lỗi tải dữ liệu biểu đồ
        </div>
      ) : !data || !data.data?.length ? (
        <div className="text-gray-400 text-sm text-center flex-1 flex items-center justify-center">
          Không có dữ liệu để hiển thị
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            {/* Phần Pie chính */}
            <Pie
              data={data.data.map((item) => ({
                status: LABEL[item.status] || item.status,
                count: Number(item.count),
              }))}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="count"
              nameKey="status"
              label={({ name, value }) => {
                const total = data.total || 1
                const percent = (Number(value) / Number(total)) * 100
                return `${name} (${percent.toFixed(1)}%)`
              }}
            >
              {data.data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {/* Tooltip + Legend */}
            <Tooltip
              formatter={(value, name) => [`${value} đơn hàng`, name]}
              contentStyle={{
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              wrapperStyle={{
                paddingLeft: 20,
                fontSize: '0.85rem',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default OrdersByStatusChart
