'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Store, Clock, CheckCircle, XCircle, Ban } from 'lucide-react'
import { VendorTable } from './components/VendorTable'
import { useVendorManagement } from './hooks/useVendorManagement'
import { useGetVendorsByStatusQuery } from '@/services/vendor/vendor.service'
import type { TabValue } from './types'

type VendorStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'suspended'

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('vendors')
  const [vendorStatus, setVendorStatus] = useState<VendorStatus>('all')
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  })

  // Get all vendors or by status
  const {
    vendors: allVendors,
    pagination: allPagination,
    isLoading: allLoading,
    approveVendor,
    rejectVendor,
    suspendVendor,
    deleteVendor,
  } = useVendorManagement(filters)

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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Quản lý người dùng</h1>
        <p className="text-muted-foreground mt-2">Quản lý users và vendors trong hệ thống</p>
      </motion.div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="space-y-6"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="vendors" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Vendors
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách Users</CardTitle>
              <CardDescription>Quản lý tất cả users trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center py-12">
                <p className="text-muted-foreground">Chức năng đang được phát triển</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendors Tab */}
        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Danh sách Vendors</CardTitle>
                  <CardDescription>
                    Quản lý và phê duyệt vendors trong hệ thống
                    {pagination && <span className="ml-2">({pagination.total} vendors)</span>}
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
