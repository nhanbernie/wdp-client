'use client'

import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { RotateCcw, Sparkles } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ClearFiltersButton() {
  const router = useRouter()
  const pathname = usePathname()
  const { colors } = useTheme()

  const handleClear = () => {
    // Xóa hết params lọc khỏi URL
    router.replace(pathname)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Button
        onClick={handleClear}
        className="w-full text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 h-12 rounded-2xl"
        style={{
          backgroundColor: colors.error,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.accentSecondary
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.error
        }}
      >
        <RotateCcw className="h-5 w-5" />
        Xóa tất cả bộ lọc
        {/* <Sparkles className="h-4 w-4" /> */}
      </Button>
    </motion.div>
  )
}
