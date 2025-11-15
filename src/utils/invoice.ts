// @ts-ignore - pdfmake doesn't have proper TypeScript definitions
import pdfMake from 'pdfmake/build/pdfmake'
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts'
import type { Order } from '@/services/orders/types'

// Set up pdfMake fonts
// @ts-ignore
try {
  // Try different possible structures
  if (pdfFonts?.pdfMake?.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
  } else if ((pdfFonts as any)?.default?.pdfMake?.vfs) {
    pdfMake.vfs = (pdfFonts as any).default.pdfMake.vfs
  } else if ((pdfFonts as any)?.default) {
    pdfMake.vfs = (pdfFonts as any).default
  } else if (pdfFonts) {
    // Last resort: use pdfFonts directly if it's already the vfs object
    pdfMake.vfs = pdfFonts as any
  }
} catch (error) {
  console.warn('Failed to load pdfmake fonts:', error)
  // pdfMake will use default fonts
}

/**
 * Format currency to Vietnamese format
 */
const formatCurrency = (amount: number, currency: string = 'VND'): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

/**
 * Format date to Vietnamese format
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Translate payment method to Vietnamese
 */
const translatePaymentMethod = (method: string): string => {
  const translations: Record<string, string> = {
    cod: 'Thanh toán khi nhận hàng',
    bank_transfer: 'Chuyển khoản ngân hàng',
    credit_card: 'Thẻ tín dụng',
    e_wallet: 'Ví điện tử',
  }
  return translations[method.toLowerCase()] || method
}

/**
 * Translate payment status to Vietnamese
 */
const translatePaymentStatus = (status: string): string => {
  const translations: Record<string, string> = {
    paid: 'Đã thanh toán',
    pending: 'Chờ thanh toán',
    failed: 'Thanh toán thất bại',
    refunded: 'Đã hoàn tiền',
  }
  return translations[status.toLowerCase()] || status
}

/**
 * Translate order status to Vietnamese
 */
const translateOrderStatus = (status: string): string => {
  const translations: Record<string, string> = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    admin_confirmed: 'Đã xác nhận',
    shipping: 'Đang giao hàng',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy',
    refunded: 'Đã hoàn tiền',
    completed: 'Hoàn thành',
  }
  return translations[status.toLowerCase()] || status
}

/**
 * Generate and download invoice PDF for an order
 */
export const generateInvoicePDF = async (order: Order): Promise<void> => {
  const fullAddress = [
    order.shippingAddress,
    order.shippingWard,
    order.shippingDistrict,
    order.shippingCity,
  ]
    .filter(Boolean)
    .join(', ')

  // Define document structure
  // @ts-ignore
  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 10,
      lineHeight: 1.4,
    },
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        color: '#ffffff',
        alignment: 'center',
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 12,
        color: '#ffffff',
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      sectionTitle: {
        fontSize: 14,
        bold: true,
        color: '#1a1a1a',
        margin: [0, 15, 0, 8],
      },
      label: {
        fontSize: 10,
        bold: true,
        color: '#666666',
        margin: [0, 4, 0, 2],
      },
      value: {
        fontSize: 10,
        color: '#1a1a1a',
        margin: [0, 0, 0, 6],
      },
      tableHeader: {
        bold: true,
        fontSize: 9,
        color: '#1a1a1a',
        fillColor: '#f5f5f5',
        alignment: 'left',
      },
      tableCell: {
        fontSize: 9,
        color: '#1a1a1a',
      },
      summaryLabel: {
        fontSize: 10,
        color: '#666666',
      },
      summaryValue: {
        fontSize: 10,
        bold: true,
        color: '#1a1a1a',
        alignment: 'right',
      },
      totalLabel: {
        fontSize: 12,
        bold: true,
        color: '#1a1a1a',
      },
      totalValue: {
        fontSize: 12,
        bold: true,
        color: '#F4A800',
        alignment: 'right',
      },
      footer: {
        fontSize: 9,
        color: '#999999',
        alignment: 'center',
        italics: true,
        margin: [0, 20, 0, 0],
      },
    },
    content: [
      // Header with background
      {
        stack: [
          {
            text: 'HÓA ĐƠN BÁN HÀNG',
            style: 'header',
          },
          {
            text: 'AICStore - Cửa hàng vật liệu xây dựng',
            style: 'subheader',
          },
        ],
        background: '#F4A800',
        margin: [-40, -60, -40, 0],
        padding: [20, 0, 20, 0],
      },

      // Order Information Section
      {
        text: 'Thông tin đơn hàng',
        style: 'sectionTitle',
      },
      {
        columns: [
          {
            width: '50%',
            stack: [
              {
                text: 'Mã đơn hàng',
                style: 'label',
              },
              {
                text: order.orderNumber,
                style: 'value',
              },
              {
                text: 'Ngày đặt hàng',
                style: 'label',
              },
              {
                text: formatDate(order.createdAt),
                style: 'value',
              },
            ],
          },
          {
            width: '50%',
            stack: [
              {
                text: 'Trạng thái',
                style: 'label',
              },
              {
                text: translateOrderStatus(order.status),
                style: 'value',
              },
              {
                text: 'Phương thức thanh toán',
                style: 'label',
              },
              {
                text: translatePaymentMethod(order.paymentMethod),
                style: 'value',
              },
              {
                text: 'Trạng thái thanh toán',
                style: 'label',
              },
              {
                text: translatePaymentStatus(order.paymentStatus),
                style: 'value',
              },
            ],
          },
        ],
        margin: [0, 0, 0, 15],
      },

      // Customer Information Section
      {
        text: 'Thông tin khách hàng',
        style: 'sectionTitle',
      },
      {
        columns: [
          {
            width: '50%',
            stack: [
              {
                text: 'Tên người nhận',
                style: 'label',
              },
              {
                text: order.shippingName,
                style: 'value',
              },
              {
                text: 'Số điện thoại',
                style: 'label',
              },
              {
                text: order.shippingPhone,
                style: 'value',
              },
            ],
          },
          {
            width: '50%',
            stack: [
              {
                text: 'Địa chỉ',
                style: 'label',
              },
              {
                text: fullAddress,
                style: 'value',
              },
            ],
          },
        ],
        margin: [0, 0, 0, 15],
      },

      // Product Details Section
      {
        text: 'Chi tiết sản phẩm',
        style: 'sectionTitle',
      },
      {
        table: {
          headerRows: 1,
          widths: ['8%', '42%', '12%', '18%', '20%'],
          body: [
            // Header row
            [
              {
                text: 'STT',
                style: 'tableHeader',
              },
              {
                text: 'Tên sản phẩm',
                style: 'tableHeader',
              },
              {
                text: 'SL',
                style: 'tableHeader',
                alignment: 'center',
              },
              {
                text: 'Đơn giá',
                style: 'tableHeader',
                alignment: 'right',
              },
              {
                text: 'Thành tiền',
                style: 'tableHeader',
                alignment: 'right',
              },
            ],
            // Data rows
            ...(order.items.map((item, index) => {
              const productName = item.variantName
                ? `${item.productName} - ${item.variantName}`
                : item.productName

              return [
                {
                  text: (index + 1).toString(),
                  style: 'tableCell',
                  alignment: 'center',
                },
                {
                  text: productName,
                  style: 'tableCell',
                },
                {
                  text: item.quantity.toString(),
                  style: 'tableCell',
                  alignment: 'center',
                },
                {
                  text: formatCurrency(item.unitPrice, order.currency),
                  style: 'tableCell',
                  alignment: 'right',
                },
                {
                  text: formatCurrency(item.totalPrice, order.currency),
                  style: 'tableCell',
                  alignment: 'right',
                },
              ]
            }) as any[]),
          ],
        },
        layout: {
          hLineWidth: (i: number, node: any) => {
            if (i === 0 || i === node.table.body.length) return 1
            return i === 1 ? 1 : 0.5
          },
          vLineWidth: () => 0.5,
          hLineColor: () => '#e0e0e0',
          vLineColor: () => '#e0e0e0',
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 6,
          paddingBottom: () => 6,
        },
        margin: [0, 0, 0, 20],
      },

      // Summary Section
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            stack: [
              {
                columns: [
                  {
                    text: 'Tạm tính:',
                    style: 'summaryLabel',
                  },
                  {
                    text: formatCurrency(order.subtotal, order.currency),
                    style: 'summaryValue',
                  },
                ],
                margin: [0, 0, 0, 4],
              },
              ...(order.discountAmount > 0
                ? [
                    {
                      columns: [
                        {
                          text: 'Giảm giá:',
                          style: 'summaryLabel',
                        },
                        {
                          text: `-${formatCurrency(order.discountAmount, order.currency)}`,
                          style: 'summaryValue',
                        },
                      ],
                      margin: [0, 0, 0, 4],
                    },
                  ]
                : []),
              {
                columns: [
                  {
                    text: 'Phí vận chuyển:',
                    style: 'summaryLabel',
                  },
                  {
                    text: formatCurrency(order.shippingFee, order.currency),
                    style: 'summaryValue',
                  },
                ],
                margin: [0, 0, 0, 4],
              },
              ...(order.taxAmount > 0
                ? [
                    {
                      columns: [
                        {
                          text: 'Thuế:',
                          style: 'summaryLabel',
                        },
                        {
                          text: formatCurrency(order.taxAmount, order.currency),
                          style: 'summaryValue',
                        },
                      ],
                      margin: [0, 0, 0, 4],
                    },
                  ]
                : []),
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 0,
                    x2: 200,
                    y2: 0,
                    lineWidth: 1,
                    lineColor: '#F4A800',
                  },
                ],
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    text: 'Tổng cộng:',
                    style: 'totalLabel',
                  },
                  {
                    text: formatCurrency(order.totalAmount, order.currency),
                    style: 'totalValue',
                  },
                ],
              },
            ],
          },
        ],
        margin: [0, 0, 0, 30],
      },

      // Footer
      {
        stack: [
          {
            text: 'Cảm ơn bạn đã mua sắm tại AICStore!',
            style: 'footer',
          },
          {
            text: 'Hóa đơn này được tạo tự động bởi hệ thống.',
            style: 'footer',
          },
        ],
      },
    ],
  }

  // Generate and download PDF
  const fileName = `Hoa-don-${order.orderNumber}-${new Date().getTime()}.pdf`
  pdfMake.createPdf(docDefinition).download(fileName)
}
