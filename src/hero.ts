import { heroui } from '@heroui/react'

export default heroui({
  themes: {
    light: {
      extend: 'light',
      colors: {
        primary: '#1976D2',
        secondary: '#5C6BC0',
        background: '#f4f4f5',
        foreground: '#27272A'
      }
    },
    dark: {
      extend: 'dark',
      colors: {
        primary: '#50A2FF',
        secondary: '#8fa0ff',
        background: '#27272A',
        foreground: '#E4E4E7'
      }
    }
  }
})
