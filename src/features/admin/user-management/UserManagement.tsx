'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Store, Clock, CheckCircle, XCircle, Ban } from 'lucide-react'
import { VendorTable, UserTable } from './components'
import { useVendorManagement } from './hooks/useVendorManagement'
import { useUserManagement } from './hooks/useUserManagement'
import { useGetVendorsByStatusQuery } from '@/services/vendor/vendor.service'
import { useTheme } from '@/contexts/ThemeContext'
import type { TabValue } from './types'

type VendorStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'suspended'

const UserManagement = () => {
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState<TabValue>('users')
  const [vendorStatus, setVendorStatus] = useState<VendorStatus>('all')
  const [userFilters, setUserFilters] = useState({
    page: 1,
    limit: 10,
  })
  const [vendorFilters, setVendorFilters] = useState({
    page: 1,
    limit: 10,
  })

  // Users Management
  const {
    users,
    pagination: userPagination,
    isLoading: usersLoading,
    banUser,
    unbanUser,
    changeRole,
  } = useUserManagement(userFilters)

  // Vendors Management
  const {
    vendors: allVendors,
    pagination: allPagination,
    isLoading: allLoading,
    approveVendor,
    rejectVendor,
    suspendVendor,
    deleteVendor,
  } = useVendorManagement(vendorFilters)

  const { data: pendingData, isLoading: pendingLoading } = useGetVendorsByStatusQuery('pending', {
    skip: vendorStatus !== 'pending',
  })
  const { data: approvedData, isLoading: approvedLoading } = useGetVendorsByStatusQuery(
    'approved',
    { skip: vendorStatus !== 'approved' },
  )
  const { data: rejectedData, isLoading: rejectedLoading } = useGetVendorsByStatusQuery(
    'rejected',
    { skip: vendorStatus !== 'rejected' },
  )
  const { data: suspendedData, isLoading: suspendedLoading } = useGetVendorsByStatusQuery(
    'suspended',
    { skip: vendorStatus !== 'suspended' },
  )

  // Determine which data to show
  const getVendorData = () => {
    switch (vendorStatus) {
      case 'pending':
        return {
          vendors: pendingData?.data || [],
          isLoading: pendingLoading,
        }
      case 'approved':
        return {
          vendors: approvedData?.data || [],
          isLoading: approvedLoading,
        }
      case 'rejected':
        return {
          vendors: rejectedData?.data || [],
          isLoading: rejectedLoading,
        }
      case 'suspended':
        return {
          vendors: suspendedData?.data || [],
          isLoading: suspendedLoading,
        }
      default:
        return {
          vendors: allVendors,
          isLoading: allLoading,
        }
    }
  }

  const { vendors, isLoading } = getVendorData()
  const pagination = vendorStatus === 'all' ? allPagination : undefined

  return (
    <div className="space-y-8 min-h-screen p-6" style={{ background: colors.backgroundGradient }}>
      {/* Header */}
      <div
        className="p-8 rounded-2xl shadow-lg"
        style={{
          background: colors.cardBackground,
          borderLeftWidth: '4px',
          borderLeftColor: colors.accent,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl shadow-lg" style={{ background: colors.accent }}>
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
              Quản lý người dùng
            </h1>
            <p className="mt-2" style={{ color: colors.textSecondary }}>
              Quản lý users và vendors trong hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="space-y-6"
      >
        <TabsList
          className="grid w-full max-w-md grid-cols-2 p-1 h-14"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            border: `1px solid ${colors.border}30`,
            boxShadow: `0 4px 12px ${colors.border}20`,
          }}
        >
          <TabsTrigger
            value="users"
            className="flex items-center gap-2 data-[state=active]:shadow-md font-semibold text-base"
          >
            <Users className="h-5 w-5" />
            Users
          </TabsTrigger>
          <TabsTrigger
            value="vendors"
            className="flex items-center gap-2 data-[state=active]:shadow-md font-semibold text-base"
          >
            <Store className="h-5 w-5" />
            Vendors
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card
            className="shadow-xl"
            style={{ background: colors.cardBackground, borderColor: colors.border }}
          >
            <CardHeader style={{ borderBottomColor: colors.border }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle
                    className="flex items-center gap-3 text-2xl"
                    style={{ color: colors.text }}
                  >
                    <div className="p-2 rounded-xl shadow-md" style={{ background: colors.accent }}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    Danh sách Users
                  </CardTitle>
                  <CardDescription
                    className="mt-2 text-base"
                    style={{ color: colors.textSecondary }}
                  >
                    Quản lý tất cả users trong hệ thống
                    {userPagination && (
                      <span className="ml-2 font-semibold" style={{ color: colors.accent }}>
                        ({userPagination.total} users)
                      </span>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <UserTable
                users={users}
                isLoading={usersLoading}
                onViewActivity={(userId) => {
                  // Navigate to user activity page or open modal
                }}
                onBanUser={banUser}
                onUnbanUser={unbanUser}
                onChangeRole={changeRole}
              />

              {/* Pagination */}
              {userPagination && userPagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Trang {userPagination.page} / {userPagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                      disabled={userPagination.page === 1}
                    >
                      Trước
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                      disabled={userPagination.page === userPagination.totalPages}
                    >
                      Sau
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendors Tab */}
        <TabsContent value="vendors">
          <Card
            className="shadow-xl"
            style={{ background: colors.cardBackground, borderColor: colors.border }}
          >
            <CardHeader style={{ borderBottomColor: colors.border }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle
                    className="flex items-center gap-3 text-2xl"
                    style={{ color: colors.text }}
                  >
                    <div className="p-2 rounded-xl shadow-md" style={{ background: colors.accent }}>
                      <Store className="h-6 w-6 text-white" />
                    </div>
                    Danh sách Vendors
                  </CardTitle>
                  <CardDescription
                    className="mt-2 text-base"
                    style={{ color: colors.textSecondary }}
                  >
                    Quản lý và phê duyệt vendors trong hệ thống
                    {pagination && (
                      <span className="ml-2 font-semibold" style={{ color: colors.accent }}>
                        ({pagination.total} vendors)
                      </span>
                    )}
                  </CardDescription>
                </div>

                {/* Status Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={vendorStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('all')}
                    className="gap-2"
                  >
                    <Store className="h-4 w-4" />
                    Tất cả
                  </Button>
                  <Button
                    variant={vendorStatus === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('pending')}
                    className="gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Chờ duyệt
                  </Button>
                  <Button
                    variant={vendorStatus === 'approved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('approved')}
                    className="gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Đã duyệt
                  </Button>
                  <Button
                    variant={vendorStatus === 'rejected' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('rejected')}
                    className="gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Từ chối
                  </Button>
                  <Button
                    variant={vendorStatus === 'suspended' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('suspended')}
                    className="gap-2"
                  >
                    <Ban className="h-4 w-4" />
                    Đình chỉ
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <VendorTable
                vendors={vendors}
                onApprove={approveVendor}
                onReject={rejectVendor}
                onSuspend={suspendVendor}
                onDelete={deleteVendor}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UserManagement
