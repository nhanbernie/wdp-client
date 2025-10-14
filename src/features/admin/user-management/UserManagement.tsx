'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Store } from 'lucide-react'
import { VendorTable } from './components/VendorTable'
import { useVendorManagement } from './hooks/useVendorManagement'
import type { TabValue } from './types'

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('vendors')
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  })

  const { vendors, pagination, isLoading, approveVendor, rejectVendor, suspendVendor } =
    useVendorManagement(filters)

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
              <CardTitle>Danh sách Vendors</CardTitle>
              <CardDescription>
                Quản lý và phê duyệt vendors trong hệ thống
                {pagination && <span className="ml-2">({pagination.total} vendors)</span>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VendorTable
                vendors={vendors}
                onApprove={approveVendor}
                onReject={rejectVendor}
                onSuspend={suspendVendor}
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
