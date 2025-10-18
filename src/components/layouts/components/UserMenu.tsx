'use client'

import React from 'react'
import { User, Settings, LogOut, ChevronDown, Package, Sparkles, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ActionMenu'

export interface UserMenuProps {
  user?: {
    name?: string
    email?: string
    avatar?: string
  }
}

const UserMenu = ({ user: propUser }: UserMenuProps) => {
  const { user, logout, isAuthenticated } = useAuth()
  const { colors } = useTheme()

  // Use auth context user if available, otherwise use prop user
  const currentUser = user || propUser

  // If not authenticated, show sign up button
  if (!isAuthenticated) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/login"
          className="relative inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-lg transition-all duration-300 overflow-hidden group shadow-xl hover:shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            color: 'white',
          }}
        >
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
          <Sparkles className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Sign In</span>
        </Link>
      </motion.div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer border-2 border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xl relative overflow-hidden group"
        >
          {/* Gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative w-8 h-8 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            {currentUser?.avatar ? (
              <Image
                src={currentUser.avatar}
                alt={currentUser.name || 'User'}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={18} className="text-white" />
            )}
          </div>

          <motion.div
            animate={{ rotate: [0, 180, 0] }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <ChevronDown
              size={18}
              className="text-slate-700 group-hover:text-indigo-600 transition-colors"
            />
          </motion.div>
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-68 p-2 rounded-2xl border-2 border-slate-200 shadow-2xl bg-white"
      >
        {currentUser && (
          <>
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  {currentUser?.avatar ? (
                    <Image
                      src={currentUser.avatar}
                      alt={currentUser.name || 'User'}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black text-slate-900">{currentUser.name || 'User'}</p>
                  <p className="text-sm text-slate-600 font-medium">{currentUser.email}</p>
                  <div className="flex items-center gap-1 mt-1 px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 w-fit">
                    <Shield className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-black text-emerald-900">Verified</span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200 my-2" />
          </>
        )}

        <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
          <DropdownMenuItem className="cursor-pointer rounded-xl p-4 my-1 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-200 border-2 border-transparent">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-3 shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-slate-900">Profile</span>
          </DropdownMenuItem>
        </motion.div>

        <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
          <DropdownMenuItem className="cursor-pointer rounded-xl p-4 my-1 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 border-2 border-transparent">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mr-3 shadow-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-slate-900">Settings</span>
          </DropdownMenuItem>
        </motion.div>

        <DropdownMenuSeparator className="bg-slate-200 my-2" />

        <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer rounded-xl p-4 my-1 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:border-red-200 border-2 border-transparent group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mr-3 shadow-lg">
              <LogOut className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-red-600 group-hover:text-red-700">Sign Out</span>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
