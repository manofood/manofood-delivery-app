import type { Config } from 'tailwindcss'
import themeConfig from '@/hero'

const config: Config = {
  content: [
    './public/**/*.{js,ts,jsx,tsx,svg}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js'
  ],
  plugins: [themeConfig]
}

export default config
