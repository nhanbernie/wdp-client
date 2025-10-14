'use client'

import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function ClearFiltersButton() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClear = () => {
    // Xóa hết params lọc khỏi URL
    router.replace(pathname)
  }

  return (
    <motion.div
    // whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
    >
      <Button
        onClick={handleClear}
        className="w-full bg-[var(--primary)] text-sm font-medium hover:opacity-80 hover:text-white transition-all cursor-pointer"
      >
        Xóa tất cả bộ lọc
      </Button>
    </motion.div>
  )
}
