'use client'

import React from 'react'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
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
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors"
        style={{
          backgroundColor: colors.text,
          color: colors.background,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.hoverBackground
          e.currentTarget.style.color = colors.hoverText
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.text
          e.currentTarget.style.color = colors.background
        }}
      >
        Sign-In
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-all duration-200">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            {currentUser?.avatar ? (
              <Image
                src={currentUser.avatar}
                alt={currentUser.name || 'User'}
                width={32}
                height={32}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={16} className="text-muted-foreground" />
            )}
          </div>
          <ChevronDown size={16} className="text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {currentUser && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser.name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#404040]" />
          </>
        )}

        <DropdownMenuItem className="cursor-pointer hover:bg-[var(--primary)]">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer hover:bg-[var(--primary)]">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="text-red-600  cursor-pointer hover:bg-red-600 hover:text-white "
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
