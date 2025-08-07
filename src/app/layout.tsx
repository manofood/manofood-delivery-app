import type { Metadata } from 'next'
import { Akshar, Roboto } from 'next/font/google'
import Providers from '@/components/wired/providers'
import './globals.css'

const akshar = Akshar({ variable: '--font-akshar', subsets: ['latin'] })

const roboto = Roboto({ variable: '--font-roboto', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ManoFood',
  description: 'ManoFood is a food delivery app'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" data-theme="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="ManoFood" />
      </head>

      <body className={`${akshar.variable} ${roboto.variable} antialiased bg-zinc-100 dark:bg-zinc-800`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
