'use client'

import React from 'react'
import { User, LogOut, ChevronDown, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { getNeumorphismShadow } from '@/common/constants/neumorphism'
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
  const { theme } = useTheme()
  const neumorphismShadow = getNeumorphismShadow(theme)
  
  // Background color cho UserMenu buttons
  const buttonBackgroundColor = theme === 'light' ? '#ffffff' : '#2a2a2a'

  const currentUser = user || propUser

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-accent-primary text-white font-medium transition-all duration-200 hover:bg-accent-secondary hover:shadow-lg"
      >
        <Sparkles className="w-4 h-4" />
        <span>Sign In</span>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer bg-card hover:bg-accent-primary/10 group border-0"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-accent-primary flex items-center justify-center">
            {currentUser?.avatar ? (
              <Image
                src={currentUser.avatar}
                alt={currentUser.name || 'User'}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={18} className="text-white" />
            )}
          </div>

          <ChevronDown
            size={16}
            className="text-muted-foreground group-hover:text-accent-primary transition-colors"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-64 p-2 bg-card dark:bg-[#2a2a2a] border-0 rounded-3xl"
        style={{
          boxShadow: neumorphismShadow,
          backgroundColor: theme === 'light' ? '#ffffff' : '#2a2a2a',
        }}
      >
        {currentUser && (
          <>
            <DropdownMenuLabel className="p-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent-primary flex items-center justify-center">
                  {currentUser?.avatar ? (
                    <Image
                      src={currentUser.avatar}
                      alt={currentUser.name || 'User'}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {currentUser.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {/* stroke */}
        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer hover:bg-accent-primary/10 hover:text-accent-primary focus:bg-accent-primary/10 focus:text-accent-primary group/item">
            <User className="h-4 w-4 mr-2 text-muted-foreground group-hover/item:text-accent-primary transition-colors" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={logout} 
          className="cursor-pointer hover:bg-accent-primary/10 hover:text-accent-primary focus:bg-accent-primary/10 focus:text-accent-primary group/item"
        >
          <LogOut className="h-4 w-4 mr-2 text-muted-foreground group-hover/item:text-error transition-colors" />
          <span className="group-hover/item:text-error">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
