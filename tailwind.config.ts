import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './public/**/*.{js,ts,jsx,tsx,svg}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js'
  ]
}

export default config
