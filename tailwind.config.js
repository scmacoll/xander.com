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
      },
      textColor: {
        'greyed-out': '#d2cfca2b',
        'gold': 'rgb(var(--everforest-gold))',
      },
      placeholderColor: {
        'greyed-out': '#d2cfca2b',
      },
      backgroundColor: { // bg-...
        background: `rgb(var(--background-start-rgb))`,
        'amazon-yellow': 'rgb(var(--everforest-gold), .7)',
        'shopify-blue': 'rgb(var(--scroll-blue))',
      },
      borderColor: { // border-...
        foreground: `rgb(var(--foreground-rgb), .3)`,
        'amazon-yellow': 'rgb(var(--everforest-gold), .7)',
        'shopify-blue': 'rgb(var(--scroll-blue))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '38%': '38%', 
        '39%': '39%', 
        '4/10': '40%', 
        '51%': '51%', 
        '51.5%': '51.5%', 
        '52%': '52%',
        '70%': '70%',
        '72%': '72%',
        '77%': '77%',
        '78%': '78%',
        '8/10': '80%',
      },
    },
    screens: {
      'custom-xs': '749px',
      'custom-sm': '750px',
      'custom-md': '1099px',
      'custom-lg': '1100px',
    },
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
        '.border-purp': {
          border: '.1px solid purple',
        },
        '.border-oj': {
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
