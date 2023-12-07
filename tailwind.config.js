/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: `rgb(var(--foreground-rgb))`,
        background: `rgb(var(--background-start-rgb))`,
        'greyed-out': '#d2cfca2b',
        'shopify-blue': 'rgb(var(--scroll-blue))',
      },
      textColor: {
        'foreground': `rgb(var(--foreground-rgb))`,
        'fg-06': `rgb(var(--foreground-rgb), 0.6)`,
        'creme': `rgb(var(--everforest-creme))`,
        'greyed-out': '#d2cfca2b',
        'gold': 'rgb(var(--everforest-gold))',
        'shopify-blue': 'rgb(var(--scroll-blue))',
        'link-blue': 'rgb(var(--link-blue), .7)',
        'custom-red': 'rgb(var(--red))',
      },
      stroke: {
        'custom-red': 'rgb(var(--red))',
      },
      fill: {
        'foreground': `rgb(var(--foreground-rgb))`,
        'fg-06': `rgb(var(--foreground-rgb), 0.6)`,
        'creme': `rgb(var(--everforest-creme))`,
        'greyed-out': '#d2cfca2b',
        'gold': 'rgb(var(--everforest-gold), .3)',
        'shopify-blue': 'rgb(var(--scroll-blue))',
        'link-blue': 'rgb(var(--link-blue), .7)',
        'custom-red': 'rgb(var(--red))',
      },
      placeholderColor: {
        'greyed-out': '#d2cfca2b',
      },
      backgroundColor: { // bg-...
        background: `rgb(var(--background-start-rgb))`,
        'translucent': `rgb(var(--background-translucent-rgb))`,
        'amazon-yellow': 'rgb(var(--everforest-gold), .7)',
        'shopify-blue': 'rgb(var(--scroll-blue))',
        'custom-red': 'rgb(var(--red))',
        'gold': 'rgb(var(--everforest-gold))',
      },
      borderColor: { // border-...
        foreground: `rgb(var(--foreground-rgb), .3)`,
        'amazon-yellow': 'rgb(var(--everforest-gold), .7)',
        'shopify-blue': 'rgb(var(--scroll-blue))',
        'greyed-out': '#d2cfca2b',
        'custom-red': 'rgb(var(--red))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'alliance': ["Alliance Neue"],
        'alliance-1': ["Alliance No.1"],
        'alliance-2': ["Alliance No.2"],
        'alliance-mono': ["Alliance Mono"]
      },
      width: {
        '32%': '32%',
        '38%': '38%',
        '39%': '39%',
        '45%': '45%',
        '49%': '49%',
        '4/10': '40%',
        '51%': '51%', 
        '51.5%': '51.5%', 
        '52%': '52%',
        '55%': '55%',
        '59%': '59%',
        '60%': '60%',
        '62%': '62%',
        '64%': '64%',
        '70%': '70%',
        '72%': '72%',
        '77%': '77%',
        '78%': '78%',
        '95%': '95%',
        '8/10': '80%',
        '95.85px': '95.85px',
        '100px': '100px',
        '168px': '168px',
        '247px': '247px',
        '532px': '532px',
        '572px': '572px',
        '599px': '599px',
        '749px': '749px',
        '735px': '735px',
        '750px': '750px',
        '935px': '935px',
        '1120px': '1120px',
        '1425px': '1425px',
        '2000px': '2000px',
        '4000px': '4000px',
      },
      maxWidth: {
        '32%': '32%',
        '38%': '38%',
        '39%': '39%',
        '45%': '45%',
        '49%': '49%',
        '4/10': '40%',
        '51%': '51%',
        '51.5%': '51.5%',
        '52%': '52%',
        '55%': '55%',
        '59%': '59%',
        '60%': '60%',
        '62%': '62%',
        '64%': '64%',
        '70%': '70%',
        '72%': '72%',
        '77%': '77%',
        '78%': '78%',
        '8/10': '80%',
        '168px': '168px',
        '247px': '247px',
        '532px': '532px',
        '572px': '572px',
        '599px': '599px',
        '749px': '749px',
        '735px': '735px',
        '750px': '750px',
        '935px': '935px',
        '1120px': '1120px',
        '1425px': '1425px',
        '2000px': '2000px',
        '4000px': '4000px',
      },
      height: {
        '50px': '50px',
        '100px': '100px',
        '576.8px': '576.8px',
        '610px': '610px',
      },
      maxHeight: {
        '576.8px': '576.8px',
        '610px': '610px',
        '758px': '758px',
      },
    },
    screens: {
      'custom-xs': '749px',
      'custom-sm': '750px',
      'custom-md': '1099px',
      'custom-lg': '1099px',
      'lg': '1200px', // For min-width: 1200px
      'md': {'min': '1000px', 'max': '1199px'}, // For 1000px ≤ width ≤ 1199px
      'sm': {'min': '750px', 'max': '999px'},   // For 750px ≤ width ≤ 999px
      'xs': {'max': '749px'},
    },
    display: ['group-hover'],
  },
  variants: {
    extend: {
      borderColor: ['focus'],
      backgroundColor: ['focus'],
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.border-red': {
          border: '.1px solid red',
        },
        '.border-green': {
          border: '.1px solid green',
        },
        '.border-blue': {
          border: '.1px solid blue',
        },
        '.border-yellow': {
          border: '.1px solid yellow',
        },
        '.border-purple': {
          border: '.1px solid purple',
        },
        '.border-orange': {
          border: '.1px solid orange',
        },
        '.border-pink': {
          border: '.1px solid pink',
        },
        '.border-white': {
          border: '.1px solid white',
        },
        '.border-d-white': {
          border: '.1px dashed white',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
