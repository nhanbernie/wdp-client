import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border-2 px-3 py-1 text-xs font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden hover:scale-105 shadow-md hover:shadow-lg',

  {
    variants: {
      variant: {
        default:
          'border-transparent bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-blue-500/30',
        secondary:
          'border-transparent bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700 shadow-gray-500/30',
        destructive:
          'border-transparent bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 shadow-red-500/30',
        outline:
          'text-gray-700 border-purple-300 bg-gradient-to-r from-white to-purple-50 hover:from-purple-50 hover:to-purple-100 hover:border-purple-400 shadow-purple-300/20',
        success:
          'border-transparent bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-500/30',
        warning:
          'border-transparent bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-yellow-500/30',
        info: 'border-transparent bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
