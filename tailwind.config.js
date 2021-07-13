const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        yellow: {
          '50': '#fffbf2', 
          '100': '#fff8e6', 
          '200': '#ffedbf', 
          '300': '#ffe299', 
          '400': '#ffcc4d', 
          '500': 'var(--color-primary)', 
          '600': '#e6a400', 
          '700': '#bf8900', 
          '800': '#996d00', 
          '900': '#7d5900'
        },
        blue: {
          '50': '#f2f9fd', 
          '100': '#e6f2fa', 
          '200': '#bfdff3', 
          '300': '#99cceb', 
          '400': '#4da6dc', 
          '500': 'var(--color-secondary)', 
          '600': '#0073b9', 
          '700': '#00609a', 
          '800': '#004d7b', 
          '900': '#003f64'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
