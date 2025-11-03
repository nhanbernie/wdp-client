'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { getNeumorphismShadow } from '@/common/constants/neumorphism'

interface SectionBadgeProps {
  icon: LucideIcon
  text: string
  /** Animation variants - 'animate' for Banner, 'whileInView' for other sections */
  animationType?: 'animate' | 'whileInView'
  /** Additional className for customization */
  className?: string
}

const SectionBadge = ({ icon: Icon, text, animationType = 'whileInView', className = '' }: SectionBadgeProps) => {
  const { theme } = useTheme()
  const neumorphismShadow = getNeumorphismShadow(theme)

  const baseAnimationProps =
    animationType === 'animate'
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
        }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
        }

  return (
    <motion.div {...baseAnimationProps} className={`relative ${className}`}>
      <div
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card text-accent-primary"
        style={{
          boxShadow: neumorphismShadow,
        }}
      >
        <Icon className="h-5 w-5 text-accent-primary" />
        <span className="text-sm font-bold text-accent-primary">{text}</span>
      </div>
    </motion.div>
  )
}

export default SectionBadge

