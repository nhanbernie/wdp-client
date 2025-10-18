import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-offset-2 active:scale-95 shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus-visible:ring-blue-500/50 shadow-blue-500/30',
        destructive:
          'bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 focus-visible:ring-red-500/40 shadow-red-500/30',
        outline:
          'border-2 border-purple-300 bg-gradient-to-r from-white to-purple-50 text-purple-700 hover:from-purple-50 hover:to-purple-100 hover:border-purple-400 focus-visible:ring-purple-500/40 shadow-purple-300/20',
        secondary:
          'bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700 focus-visible:ring-gray-500/40 shadow-gray-500/30',
        ghost:
          'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-700 hover:text-purple-700 shadow-none hover:shadow-md',
        link: 'text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 shadow-none',
        success:
          'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus-visible:ring-green-500/40 shadow-green-500/30',
        warning:
          'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 focus-visible:ring-yellow-500/40 shadow-yellow-500/30',
      },
      size: {
        default: 'h-10 px-5 py-2.5 has-[>svg]:px-4',
        sm: 'h-9 rounded-lg gap-1.5 px-4 text-xs has-[>svg]:px-3',
        lg: 'h-12 rounded-xl px-7 text-base has-[>svg]:px-5',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
