'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { RefreshCw } from 'lucide-react'

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: 'admin' | 'user' | 'vendor'
  requiredApprovedStatus?: 'approved' | 'pending' | 'rejected' | 'suspended' | null
  redirectTo?: string
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRole,
  requiredApprovedStatus,
  redirectTo,
}) => {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    // Check authentication
    if (!isAuthenticated || !user) {
      router.push('/login')
      return
    }

    // Check role requirement
    if (requiredRole && user.role !== requiredRole) {
      router.push('/unauthorized')
      return
    }

    // Check approved status requirement (for vendor)
    if (requiredApprovedStatus !== undefined && user.approvedStatus !== requiredApprovedStatus) {
      if (redirectTo) {
        router.push(redirectTo)
      } else {
        router.push('/unauthorized')
      }
      return
    }
  }, [user, isLoading, isAuthenticated, requiredRole, requiredApprovedStatus, redirectTo, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Show loading while redirecting
  if (
    !user ||
    (requiredRole && user.role !== requiredRole) ||
    (requiredApprovedStatus !== undefined && user.approvedStatus !== requiredApprovedStatus)
  ) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <>{children}</>
}
