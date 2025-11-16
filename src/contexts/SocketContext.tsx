'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './AuthContext'
import { StorageService } from '@/services/storage/secureStorage.service'
import { API_CONFIG, API_ENDPOINTS } from '@/common/constants/endpoint.constant'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  connect: () => void
  disconnect: () => void
  onTokenRefresh?: (callback: () => void) => () => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)
  const tokenRefreshCallbacksRef = useRef<Set<() => void>>(new Set())
  const isRefreshingRef = useRef(false)

  const redirectToLogin = async () => {
    if (!isAuthenticated || !user) {
      await StorageService.clearAuthData()
      disconnect()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    } else {
      disconnect()
    }
  }

  const formatTokenForSocket = (token: string): string => {
    return token.startsWith('Bearer ') ? token : `Bearer ${token}`
  }

  const getSocketUrl = (): string => {
    return process.env.NEXT_PUBLIC_SOCKET_URL || 
           API_CONFIG.BASE_URL.replace('/api', '') || 
           'http://localhost:3000'
  }

  const setupSocketEvents = (newSocket: Socket) => {
    newSocket.on('connect', () => {
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    newSocket.on('connect_error', () => {
      setIsConnected(false)
    })

    newSocket.on('exception', (error: any) => {
      if (error.status === 'error' && error.message?.includes('Unauthorized')) {
        handleTokenExpired()
      }
    })

    newSocket.on('reconnect', () => {
      setIsConnected(true)
    })

    newSocket.on('reconnect_failed', () => {
      setIsConnected(false)
    })
  }

  const refreshToken = async (): Promise<boolean> => {
    if (isRefreshingRef.current) {
      return false
    }

    isRefreshingRef.current = true

    try {
      const refreshTokenValue = await StorageService.getRefreshToken()
      if (!refreshTokenValue) {
        disconnect()
        return false
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
      })

      if (!response.ok) {
        disconnect()
        return false
      }

      const data = await response.json()
      const newAccessToken = data.data?.accessToken || data.data?.access_token
      const newRefreshToken = data.data?.refreshToken || data.data?.refresh_token

      if (!newAccessToken) {
        disconnect()
        return false
      }

      await StorageService.setTokenData({
        access_token: newAccessToken,
        refresh_token: newRefreshToken || refreshTokenValue,
        expires_in: data.data?.expires_in || 3600,
      })

      return true
    } catch (error) {
      disconnect()
      return false
    } finally {
      isRefreshingRef.current = false
    }
  }

  const handleTokenExpired = async () => {
    const success = await refreshToken()
    
    if (success) {
      await connect()
      tokenRefreshCallbacksRef.current.forEach((callback) => {
        try {
          callback()
        } catch (error) {
          // Ignore callback errors
        }
      })
    }
  }

  const connect = async () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }

    try {
      const accessToken = await StorageService.getAccessToken()
      if (!accessToken) {
        return
      }

      const newSocket = io(getSocketUrl(), {
        auth: {
          token: formatTokenForSocket(accessToken),
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      })

      setupSocketEvents(newSocket)

      socketRef.current = newSocket
      setSocket(newSocket)
    } catch (error) {
      setIsConnected(false)
    }
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
      setSocket(null)
      setIsConnected(false)
    }
  }

  const onTokenRefresh = (callback: () => void) => {
    tokenRefreshCallbacksRef.current.add(callback)
    return () => {
      tokenRefreshCallbacksRef.current.delete(callback)
    }
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      connect()
    } else {
      disconnect()
    }

    return () => {
      disconnect()
    }
  }, [isAuthenticated, user?.id])

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        connect,
        disconnect,
        onTokenRefresh,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
