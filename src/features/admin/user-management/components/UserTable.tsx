'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  MoreVertical,
  Eye,
  Ban,
  Check,
  UserCog,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  DollarSign,
} from 'lucide-react'
import { UserListItem } from '@/services/admin/users.service'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'

interface UserTableProps {
  users: UserListItem[]
  isLoading?: boolean
  onViewActivity: (userId: string) => void
  onBanUser: (userId: string, reason: string) => void
  onUnbanUser: (userId: string) => void
  onChangeRole: (userId: string, role: string, reason: string) => void
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  onViewActivity,
  onBanUser,
  onUnbanUser,
  onChangeRole,
}) => {
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null)
  const [banDialogOpen, setBanDialogOpen] = useState(false)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [banReason, setBanReason] = useState('')
  const [roleReason, setRoleReason] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const handleBanClick = (user: UserListItem) => {
    setSelectedUser(user)
    setBanDialogOpen(true)
    setBanReason('')
  }

  const handleBanSubmit = () => {
    if (selectedUser && banReason.trim()) {
      onBanUser(selectedUser.id, banReason)
      setBanDialogOpen(false)
      setSelectedUser(null)
      setBanReason('')
    }
  }

  const handleUnban = (user: UserListItem) => {
    onUnbanUser(user.id)
  }

  const handleRoleClick = (user: UserListItem) => {
    setSelectedUser(user)
    setSelectedRole(user.roles[0] || 'user')
    setRoleDialogOpen(true)
    setRoleReason('')
  }

  const handleRoleSubmit = () => {
    if (selectedUser && selectedRole && roleReason.trim()) {
      onChangeRole(selectedUser.id, selectedRole, roleReason)
      setRoleDialogOpen(false)
      setSelectedUser(null)
      setSelectedRole('')
      setRoleReason('')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded" />
        ))}
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-white rounded-2xl shadow-lg border border-purple-200"
      >
        <p className="text-gray-500 text-lg">👤 Không có người dùng nào</p>
      </motion.div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border-2 border-purple-200 shadow-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <TableHead className="text-white font-bold">👤 Người dùng</TableHead>
              <TableHead className="text-white font-bold">📞 Liên hệ</TableHead>
              <TableHead className="text-white font-bold">🎭 Vai trò</TableHead>
              <TableHead className="text-white font-bold">⚡ Trạng thái</TableHead>
              <TableHead className="text-white font-bold">📊 Thống kê</TableHead>
              <TableHead className="text-white font-bold">📅 Ngày tạo</TableHead>
              <TableHead className="text-right text-white font-bold">⚙️ Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border-b border-purple-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group"
              >
                <TableCell>
                  <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm flex items-center gap-1 text-gray-700">
                    <Phone className="h-3 w-3" />
                    {user.phoneNumber || 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {user.roles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="bg-gradient-to-r from-blue-100 to-purple-100 border-purple-300 text-purple-700 font-semibold"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.isActive ? 'default' : 'destructive'}
                    className={
                      user.isActive
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                        : 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-md'
                    }
                  >
                    {user.isActive ? '✓ Hoạt động' : '🚫 Bị cấm'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-1 font-semibold text-blue-600">
                      <ShoppingBag className="h-4 w-4" />
                      {user.totalOrders} đơn
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-green-600">
                      <DollarSign className="h-4 w-4" />
                      {formatCurrency(user.totalSpent, 'VND')}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(user.createdAt), 'dd/MM/yyyy')}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-110 transition-all duration-200 shadow-md"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white border-2 border-purple-200 shadow-xl"
                    >
                      <DropdownMenuItem
                        onClick={() => onViewActivity(user.id)}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Xem hoạt động
                      </DropdownMenuItem>
                      {user.isActive ? (
                        <DropdownMenuItem
                          onClick={() => handleBanClick(user)}
                          className="text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Cấm người dùng
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleUnban(user)}
                          className="text-green-600 hover:bg-green-50 cursor-pointer"
                        >
                          <Check className="mr-2 h-4 w-4" /> Bỏ cấm
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleRoleClick(user)}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer"
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Thay đổi vai trò
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Ban User Dialog - Modern Style */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent className="bg-white border-2 border-red-200 shadow-2xl rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg">
                <Ban className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  Cấm người dùng
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-1">
                  Vui lòng nhập lý do cấm người dùng{' '}
                  <span className="font-semibold">{selectedUser?.email}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="ban-reason"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                📝 Lý do <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="ban-reason"
                placeholder="Nhập lý do cấm người dùng..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                rows={4}
                className="border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setBanDialogOpen(false)}
              className="border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200 font-semibold"
            >
              ❌ Hủy
            </Button>
            <Button
              onClick={handleBanSubmit}
              disabled={!banReason.trim()}
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✓ Xác nhận cấm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog - Modern Style */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent className="bg-white border-2 border-purple-200 shadow-2xl rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <UserCog className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Thay đổi vai trò
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-1">
                  Thay đổi vai trò của người dùng{' '}
                  <span className="font-semibold">{selectedUser?.email}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                🎭 Vai trò mới
              </Label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-medium"
              >
                <option value="user">👤 User</option>
                <option value="vendor">🏪 Vendor</option>
                <option value="admin">👑 Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="role-reason"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                📝 Lý do <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="role-reason"
                placeholder="Nhập lý do thay đổi vai trò..."
                value={roleReason}
                onChange={(e) => setRoleReason(e.target.value)}
                rows={4}
                className="border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setRoleDialogOpen(false)}
              className="border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200 font-semibold"
            >
              ❌ Hủy
            </Button>
            <Button
              onClick={handleRoleSubmit}
              disabled={!roleReason.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✓ Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
