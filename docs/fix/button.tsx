import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95",
  {
    variants: {
      variant: {
        default:
          'bg-accent-primary text-white hover:bg-accent-secondary focus-visible:ring-accent-primary/50 shadow-sm hover:shadow-md',
        destructive:
          'bg-error text-white hover:opacity-90 focus-visible:ring-error/50 shadow-sm hover:shadow-md',
        outline:
          'border-2 border-accent-primary bg-transparent text-accent-primary hover:bg-accent-primary/10 focus-visible:ring-accent-primary/50 shadow-none',
        secondary:
          'bg-neutral-medium text-white hover:bg-neutral-medium/80 focus-visible:ring-neutral-medium/50 shadow-sm hover:shadow-md',
        ghost:
          'bg-transparent text-foreground hover:bg-accent-primary/10 focus-visible:ring-accent-primary/50 shadow-none',
        link:
          'text-accent-primary underline-offset-4 hover:underline hover:text-accent-secondary shadow-none',
        success:
          'bg-success text-white hover:opacity-90 focus-visible:ring-success/50 shadow-sm hover:shadow-md',
        warning:
          'bg-accent-primary text-white hover:bg-accent-secondary focus-visible:ring-accent-primary/50 shadow-sm hover:shadow-md',
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
