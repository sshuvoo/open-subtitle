const {
   default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   darkMode: 'class',
   theme: {
      extend: {},
   },
   plugins: [addVariablesForColors],
}
export default config

function addVariablesForColors({ addBase, theme }: any) {
   let allColors = flattenColorPalette(theme('colors'))
   let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
   )
   addBase({
      ':root': newVars,
   })
}
