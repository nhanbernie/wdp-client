'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { orderSteps } from '../constants/order-status.constant'
import { statusConfig } from '../constants/order-status.constant'
import { OrderStatus } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderProgressTrackerProps {
  currentStatus: OrderStatus
}

export function OrderProgressTracker({ currentStatus }: OrderProgressTrackerProps) {
  const { colors } = useTheme()
  const currentConfig = statusConfig[currentStatus]
  const currentStep = currentConfig.step

  // Don't show progress for cancelled/refunded orders
  if (currentStep === 0) return null

  return (
    <div
      className="mb-8 p-8 rounded-3xl shadow-xl border-2"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }}
    >
      <h3
        className="text-2xl font-black mb-6 flex items-center gap-3"
        style={{ color: colors.text }}
      >
        <div
          className="p-2 rounded-xl"
          style={{ backgroundColor: colors.accent }}
        >
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        Tiến trình đơn hàng
      </h3>

      <div className="relative">
        {/* Progress Line */}
        <div
          className="absolute top-8 left-0 w-full h-2 rounded-full"
          style={{ backgroundColor: colors.cardBackgroundSecondary }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep - 1) / (orderSteps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: colors.accent }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {orderSteps.map((step, index) => {
            const isCompleted = step.id <= currentStep
            const isCurrent = step.id === currentStep
            const config = statusConfig[step.status]
            const StepIcon = config.icon

            return (
              <motion.div
                key={step.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative mb-4 p-4 rounded-2xl shadow-lg"
                  style={{
                    backgroundColor: isCompleted ? colors.accent : colors.border,
                    boxShadow: isCurrent
                      ? `0 0 0 4px ${colors.background}, 0 0 0 8px ${colors.accent}40`
                      : undefined,
                  }}
                >
                  <StepIcon className="h-6 w-6 text-white" />
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 p-1 rounded-full shadow-lg"
                      style={{ backgroundColor: colors.cardBackground }}
                    >
                      <CheckCircle
                        className="h-4 w-4"
                        style={{ color: colors.success }}
                      />
                    </motion.div>
                  )}
                </motion.div>

                <p
                  className="text-sm font-bold text-center"
                  style={{
                    color: isCompleted ? colors.text : colors.textSecondary,
                  }}
                >
                  {step.name}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
