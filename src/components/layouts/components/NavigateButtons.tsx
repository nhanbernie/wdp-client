import { useTheme } from '@/contexts/ThemeContext'
import { useRouter, usePathname } from 'next/navigation'
import { NavItem } from '@/common/constants/navigate.constant'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface NavigateButtonsProps {
  navigationItems: NavItem[]
}

const NavigateButtons = ({ navigationItems }: NavigateButtonsProps) => {
  const { theme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigate = (path: string) => {
    if (path) {
      router.push(path)
    }
  }

  return (
    <div className="flex gap-3">
      {navigationItems.map((item, index) => {
        const isActive = pathname === item.href
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.button
              onClick={() => handleNavigate(item.href)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative px-4 py-3 rounded-2xl font-black text-base
                transition-all duration-300 cursor-pointer
                overflow-hidden group
                ${
                  isActive
                    ? 'text-white shadow-xl'
                    : 'text-slate-700 bg-white border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl'
                }
              `}
            >
              {/* Active gradient background */}
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatDelay: 1,
                    }}
                  />
                </>
              )}

              {/* Hover gradient background for inactive */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Content */}
              <div className="relative flex items-center gap-2 z-10">
                {item.icon && (
                  <motion.div
                    animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon
                      className={`h-5 w-5 ${
                        isActive ? 'text-white' : 'text-slate-600 group-hover:text-indigo-600'
                      }`}
                    />
                  </motion.div>
                )}
                <span
                  className={
                    isActive
                      ? 'text-white'
                      : 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600'
                  }
                >
                  {item.label}
                </span>

                {/* Active indicator - sparkle */}
                {isActive && (
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Active bottom indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white rounded-full shadow-lg"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          </motion.div>
        )
      })}
    </div>
  )
}

export default NavigateButtons
