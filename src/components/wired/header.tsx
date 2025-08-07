'use client'

import { Heading } from '../ui/heading'
import { Logo } from '../ui/logo'
import ThemeToggle from './theme-toggle'

export type HeaderVariant = 'default' | 'v2' | 'v3'

type HeaderProps = {
  variant?: HeaderVariant
}

export default function Header({ variant = 'default' }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-51 px-5 border-b border-zinc-100 dark:border-zinc-700 before:absolute before:inset-0 before:-z-10 before:backdrop-blur-xs max-lg:before:bg-zinc-100/90 dark:max-lg:before:bg-zinc-800/90 ${variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:inset-x-0 after:top-full after:-z-10 after:h-px after:bg-white dark:after:bg-zinc-700/60' : 'max-lg:shadow-sm lg:before:bg-white dark:lg:before:bg-zinc-900/90'} ${variant === 'v2' ? 'dark:before:bg-gray-800' : ''} ${variant === 'v3' ? 'dark:before:bg-gray-900' : ''}`}
    >
      <div className={`flex h-16 items-center justify-between ${variant === 'v2' || variant === 'v3'}`}>
        <div className="flex-rw unmask-me flex items-center gap-3">
          <Logo width={46} height={46} />

          <div className="flex flex-col -mt-1">
            <Heading className="text-2xl h-[24px] font-semibold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              MANO
            </Heading>
            <Heading className="text-lg h-[20px] font-semibold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              FOOD
            </Heading>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
