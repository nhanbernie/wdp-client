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
          'bg-[var(--accent)] text-white hover:opacity-90 focus-visible:ring-[var(--accent)]/50 shadow-sm hover:shadow-md dark:bg-[var(--accent)]',
        destructive:
          'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-90 focus-visible:ring-[var(--destructive)]/50 shadow-sm hover:shadow-md dark:bg-[var(--destructive)] dark:text-[var(--destructive-foreground)]',
        outline:
          'border-2 border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-[var(--accent)]/10 focus-visible:ring-[var(--accent)]/50 shadow-none dark:border-[var(--accent)] dark:text-[var(--accent)] dark:hover:bg-[var(--accent)]/20',
        secondary:
          'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90 focus-visible:ring-[var(--secondary)]/50 shadow-sm hover:shadow-md dark:bg-[var(--secondary)] dark:text-[var(--secondary-foreground)]',
        ghost:
          'bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] focus-visible:ring-[var(--muted)]/50 shadow-none dark:text-[var(--foreground)] dark:hover:bg-[var(--muted)]',
        link:
          'text-[var(--accent)] underline-offset-4 hover:underline hover:text-[var(--accent)]/80 shadow-none dark:text-[var(--accent)]',
        success:
          'bg-[var(--success)] text-white hover:opacity-90 focus-visible:ring-[var(--success)]/50 shadow-sm hover:shadow-md dark:bg-[var(--success)]',
        warning:
          'bg-[var(--warning)] text-white hover:opacity-90 focus-visible:ring-[var(--warning)]/50 shadow-sm hover:shadow-md dark:bg-[var(--warning)]',
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
