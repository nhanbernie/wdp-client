'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

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
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="pb-2 border-b">
          <h1 className="text-lg font-semibold">Khoảng giá</h1>
        </div>

        <div className="space-y-4 pt-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={10000000} step={100000} />

          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            />
            <span>-</span>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
          </div>

          <div className="text-sm text-muted-foreground text-center">
            {priceRange[0].toLocaleString('vi-VN')} - {priceRange[1].toLocaleString('vi-VN')} VNĐ
          </div>
        </div>
      </div>
    </motion.div>
  )
}
