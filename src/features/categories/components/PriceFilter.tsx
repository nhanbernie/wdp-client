'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp } from 'lucide-react'
export const PriceFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // ✅ Lấy giá trị ban đầu từ URL (hoặc mặc định)
  const getInitialRange = () => {
    const min = Number(searchParams.get('minPrice')) || 0
    const max = Number(searchParams.get('maxPrice')) || 10000000
    return [min, max] as [number, number]
  }

  const [priceRange, setPriceRange] = useState<number[]>(getInitialRange)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('minPrice', priceRange[0].toString())
    params.set('maxPrice', priceRange[1].toString())
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [priceRange])

  useEffect(() => {
    const min = Number(searchParams.get('minPrice')) || 0
    const max = Number(searchParams.get('maxPrice')) || 10000000
    setPriceRange([min, max])
  }, [searchParams])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border-2 border-purple-200/50 hover:shadow-2xl transition-all duration-300"
    >
      <div>
        <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-purple-200">
          <DollarSign className="h-5 w-5 text-green-600" />
          <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Khoảng giá
          </h1>
        </div>

        <div className="space-y-5">
          {/* Slider với style mới */}
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000000}
              step={100000}
              className="cursor-pointer"
            />
          </div>

          {/* Input range với icon */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <TrendingUp className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="pl-8"
              />
            </div>

            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />

            <div className="flex-1 relative">
              <TrendingUp className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="pl-8"
              />
            </div>
          </div>

          {/* Display range với gradient */}
          <motion.div
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border-2 border-green-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <p className="text-xs text-gray-600 font-semibold mb-1">Phạm vi giá được chọn</p>
              <p className="font-bold text-sm bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {priceRange[0].toLocaleString('vi-VN')} - {priceRange[1].toLocaleString('vi-VN')}{' '}
                VNĐ
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
