import type { LinkProps } from '@heroui/link'
import { Link as HeroLink } from '@heroui/link'
import NextLink from 'next/link'
import { forwardRef } from 'react'

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return <HeroLink ref={ref} as={NextLink} {...props} />
})

Link.displayName = 'Link'

export type { LinkProps }
