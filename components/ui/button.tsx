import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive backdrop-blur-xl",
  {
    variants: {
      variant: {
        default:
          'border border-white/25 bg-white/15 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] hover:bg-white/25 hover:border-white/35',
        destructive:
          'border border-red-500/30 bg-red-600/20 text-red-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:bg-red-600/35',
        outline:
          'border border-white/15 bg-white/5 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:bg-white/10 hover:border-white/25',
        secondary:
          'border border-white/10 bg-zinc-900/50 text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:bg-zinc-800/60',
        ghost:
          'border border-transparent bg-transparent text-white hover:border-white/10 hover:bg-white/5',
        link: 'rounded-none border-0 bg-transparent text-primary underline-offset-4 shadow-none backdrop-blur-none hover:underline',
        solid:
          'border border-white/40 bg-white/90 text-zinc-950 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] hover:bg-white',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-11 px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
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
