'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Store, Clock, CheckCircle, XCircle, Ban } from 'lucide-react'
import { VendorTable, UserTable } from './components'
import { useVendorManagement } from './hooks/useVendorManagement'
import { useUserManagement } from './hooks/useUserManagement'
import { useGetVendorsByStatusQuery } from '@/services/vendor/vendor.service'
import type { TabValue } from './types'

type VendorStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'suspended'

const UserManagement = () => {
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
    <div className="space-y-8 bg-gradient-to-br from-gray-50 via-white to-primary/5 min-h-screen p-6">
      {/* Header with modern design */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 rounded-2xl border-l-4 border-primary shadow-lg backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Quản lý người dùng
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <span className="font-semibold ">Quản lý users và vendors trong hệ thống</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs with modern styling */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="space-y-6"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-gradient-to-r from-primary/10 to-primary/5 p-1 h-14 shadow-lg">
          <TabsTrigger
            value="users"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary font-semibold text-base"
          >
            <Users className="h-5 w-5" />
            Users
          </TabsTrigger>
          <TabsTrigger
            value="vendors"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary font-semibold text-base"
          >
            <Store className="h-5 w-5" />
            Vendors
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    Danh sách Users
                  </CardTitle>
                  <CardDescription className="mt-2 text-base">
                    Quản lý tất cả users trong hệ thống
                    {userPagination && (
                      <span className="ml-2 font-semibold text-primary">
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
                  console.log('View activity for user:', userId)
                }}
                onBanUser={banUser}
                onUnbanUser={unbanUser}
                onChangeRole={changeRole}
              />

              {/* Pagination */}
              {userPagination && userPagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
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
          <Card className="border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-md">
                      <Store className="h-6 w-6 text-white" />
                    </div>
                    Danh sách Vendors
                  </CardTitle>
                  <CardDescription className="mt-2 text-base">
                    Quản lý và phê duyệt vendors trong hệ thống
                    {pagination && (
                      <span className="ml-2 font-semibold text-primary">
                        ({pagination.total} vendors)
                      </span>
                    )}
                  </CardDescription>
                </div>

                {/* Status Filter Buttons with modern design */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={vendorStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('all')}
                    className={`gap-2 shadow-md transition-all ${
                      vendorStatus === 'all'
                        ? 'bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg'
                        : 'hover:bg-primary/10 border-primary/30'
                    }`}
                  >
                    <Store className="h-4 w-4" />
                    Tất cả
                  </Button>
                  <Button
                    variant={vendorStatus === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('pending')}
                    className={`gap-2 shadow-md transition-all ${
                      vendorStatus === 'pending'
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:shadow-lg'
                        : 'hover:bg-yellow-50 border-yellow-300'
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    Chờ duyệt
                  </Button>
                  <Button
                    variant={vendorStatus === 'approved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('approved')}
                    className={`gap-2 shadow-md transition-all ${
                      vendorStatus === 'approved'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg'
                        : 'hover:bg-green-50 border-green-300'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Đã duyệt
                  </Button>
                  <Button
                    variant={vendorStatus === 'rejected' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('rejected')}
                    className={`gap-2 shadow-md transition-all ${
                      vendorStatus === 'rejected'
                        ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-lg'
                        : 'hover:bg-red-50 border-red-300'
                    }`}
                  >
                    <XCircle className="h-4 w-4" />
                    Từ chối
                  </Button>
                  <Button
                    variant={vendorStatus === 'suspended' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVendorStatus('suspended')}
                    className={`gap-2 shadow-md transition-all ${
                      vendorStatus === 'suspended'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg'
                        : 'hover:bg-orange-50 border-orange-300'
                    }`}
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
