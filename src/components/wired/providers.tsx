'use client'

import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren } from 'react'
import { ToastProvider } from '@/components/ui/toast'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <NuqsAdapter>
      <ThemeProvider disableTransitionOnChange enableSystem attribute={['class', 'data-theme']}>
        <HeroUIProvider locale="pt-BR">
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </ThemeProvider>
    </NuqsAdapter>
  )
}
