'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { orderSteps } from '../constants/order-status.constant'
import { statusConfig } from '../constants/order-status.constant'
import { OrderStatus } from '@/services/orders/types'

interface OrderProgressTrackerProps {
  currentStatus: OrderStatus
}

export function OrderProgressTracker({ currentStatus }: OrderProgressTrackerProps) {
  const currentConfig = statusConfig[currentStatus]
  const currentStep = currentConfig.step

  // Don't show progress for cancelled/refunded orders
  if (currentStep === 0) return null

  return (
    <div className="mb-8 p-8 bg-white rounded-3xl shadow-xl border-2 border-slate-200">
      <h3 className="text-2xl font-black mb-6 text-slate-900 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        Tiến trình đơn hàng
      </h3>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 w-full h-2 bg-slate-200 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep - 1) / (orderSteps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className={`h-full rounded-full ${currentConfig.progressColor}`}
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
                  className={`relative mb-4 p-4 rounded-2xl shadow-lg ${
                    isCompleted ? config.progressColor : 'bg-slate-300'
                  } ${isCurrent ? 'ring-4 ring-offset-2 ' + config.ringColor : ''}`}
                >
                  <StepIcon className="h-6 w-6 text-white" />
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-lg"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    </motion.div>
                  )}
                </motion.div>

                <p
                  className={`text-sm font-bold text-center ${
                    isCompleted ? 'text-slate-900' : 'text-slate-400'
                  }`}
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
