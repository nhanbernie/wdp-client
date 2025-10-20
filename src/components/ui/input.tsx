import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-gray-400 selection:bg-blue-500 selection:text-white bg-white border-purple-200 flex h-11 w-full min-w-0 rounded-xl border-2 px-4 py-2.5 text-base shadow-md transition-all duration-200 outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-semibold disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-medium',
        'focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/20 hover:border-purple-300',
        'aria-invalid:ring-red-500/20 aria-invalid:border-red-500 focus-visible:aria-invalid:ring-red-500/20',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
