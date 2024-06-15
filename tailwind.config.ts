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
      container: {
         center: true,
         padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
            '2xl': '6rem',
         },
      },
      extend: {
         boxShadow: {
            input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
         },
         colors: {
            primary: '#03C988',
         },
      },
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
