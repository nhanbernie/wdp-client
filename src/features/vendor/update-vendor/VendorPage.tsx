'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { VendorForm } from './components/VendorForm'
import { Building2, CheckCircle, Users, TrendingUp } from 'lucide-react'
import FormProvider from '@/components/form/FormProvider'
import { vendorFormSchema } from './schemas/vendor.schema'
import { CreateVendorRequest } from '@/services/vendor/vendor.types'
import { useVendor } from './hooks/useVendor'

export const VendorPage: React.FC = () => {
  const { handleSubmit, loading, error } = useVendor()

  const defaultValues: CreateVendorRequest = {
    businessName: '',
    businessDescription: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    businessLicense: '',
    taxId: '',
  }

  const onFormSubmit = (data: CreateVendorRequest) => {
    handleSubmit(data, (vendor) => {
      console.log('Vendor created:', vendor)
      // Có thể thêm logic redirect hoặc reset form ở đây
    })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-2"
      >
        <FormProvider<CreateVendorRequest>
          defaultValues={defaultValues}
          validationSchema={vendorFormSchema}
          onSubmit={onFormSubmit}
          mode="onChange"
        >
          <VendorForm
            onSuccess={(vendor) => console.log('Vendor created:', vendor)}
            loading={loading}
            error={error}
          />
        </FormProvider>
      </motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="lg:col-span-1"
      >
        <div className="space-y-6">
          {/* Benefits Card */}
          <div className="cart-card cart-card-hover border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Lợi ích khi trở thành Vendor
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Tăng doanh thu</h4>
                  <p className="text-sm text-muted-foreground">
                    Tiếp cận hàng triệu khách hàng tiềm năng
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Hỗ trợ 24/7</h4>
                  <p className="text-sm text-muted-foreground">
                    Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Phân tích chi tiết</h4>
                  <p className="text-sm text-muted-foreground">
                    Báo cáo doanh thu và hiệu suất bán hàng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements Card */}
          <div className="cart-card cart-card-hover border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Yêu cầu đăng ký</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Giấy phép kinh doanh hợp lệ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Mã số thuế</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Thông tin liên hệ đầy đủ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Sản phẩm chất lượng</span>
              </div>
            </div>
          </div>

          {/* Process Card */}
          <div className="cart-card cart-card-hover border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Quy trình duyệt</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <span className="text-sm text-foreground">Điền thông tin đăng ký</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <span className="text-sm text-muted-foreground">Xem xét hồ sơ (1-3 ngày)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span className="text-sm text-muted-foreground">Thông báo kết quả</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
