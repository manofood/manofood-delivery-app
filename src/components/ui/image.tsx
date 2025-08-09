import type { ImageProps } from '@heroui/image'
import { Image as HeroImage } from '@heroui/image'
import NextImage from 'next/image'
import { forwardRef } from 'react'

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  return <HeroImage ref={ref} as={NextImage} {...props} />
})

Image.displayName = 'Image'

export type { ImageProps }
