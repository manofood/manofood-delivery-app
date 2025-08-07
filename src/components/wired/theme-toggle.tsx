'use client'

import { Button } from '@heroui/button'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { MdIcon } from '@/components/ui/md-icon'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const isLight = theme === 'light'

  const handleThemeChange = () => setTheme(isLight ? 'dark' : 'light')

  useEffect(() => {
    if (systemTheme && theme === 'system') setTheme(systemTheme)
  }, [systemTheme, setTheme, theme])

  return (
    <Button
      data-testid="theme-toggle"
      variant="light"
      color="default"
      radius="full"
      onPress={() => handleThemeChange()}
      className="size-10 h-10! w-10! max-h-10! p-0! mx-0!"
    >
      <MdIcon
        aria-label={isLight ? 'Light icon' : 'Dark icon'}
        name={isLight ? 'MdLightMode' : 'MdNightsStay'}
        className="h-5 w-5"
      />
      <span className="sr-only">switch to light / dark version</span>
    </Button>
  )
}
