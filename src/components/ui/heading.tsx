import { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/style'

export type HeadingProps = HTMLAttributes<HTMLHeadingElement>

export function Heading({ className, ...props }: HeadingProps) {
  return <h1 className={cn('text-xl font-medium font-heading', className)} {...props} />
}
