'use client'

import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren } from 'react'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <NuqsAdapter>
      <ThemeProvider disableTransitionOnChange enableSystem attribute={['class', 'data-theme']}>
        <HeroUIProvider>{children}</HeroUIProvider>
      </ThemeProvider>
    </NuqsAdapter>
  )
}
