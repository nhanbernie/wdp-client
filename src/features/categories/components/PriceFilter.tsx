'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const PriceFilter = () => {
  const { colors } = useTheme()
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
      className="rounded-3xl shadow-xl p-4 hover:shadow-2xl transition-all duration-300"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }}
    >
      <div>
        <div
          className="flex items-center gap-2 pb-2 mb-3 border-b"
          style={{ borderColor: `${colors.border}40` }}
        >
          <DollarSign className="h-4 w-4" style={{ color: colors.textSecondary }} />
          <h1 className="text-base font-semibold" style={{ color: colors.text }}>
            Khoảng giá
          </h1>
        </div>

        <div className="space-y-3">
          {/* Slider */}
          <div className="px-1">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000000}
              step={100000}
              className="cursor-pointer"
            />
          </div>

          {/* Input range */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="flex-1 text-sm rounded-xl"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: `${colors.border}40`,
                color: colors.text,
              }}
            />

            <span className="text-xs" style={{ color: colors.textSecondary }}>
              —
            </span>

            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="flex-1 text-sm rounded-xl"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: `${colors.border}40`,
                color: colors.text,
              }}
            />
          </div>

          {/* Display range */}
          <div
            className="rounded-xl p-2.5 border"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              borderColor: `${colors.border}40`,
            }}
          >
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                Phạm vi giá được chọn
              </p>
              <p className="font-semibold text-sm" style={{ color: colors.text }}>
                {priceRange[0].toLocaleString('vi-VN')} - {priceRange[1].toLocaleString('vi-VN')}{' '}
                VNĐ
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
