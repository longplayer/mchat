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
      },
      fontFamily: {
        serif: ['Vollkorn', 'sans-serif'],
        sans: ['Work Sans', 'sans'],
      },
      spacing: {
        '24': '6rem',
        '32': '8rem',
      },
      fontSize: {
        base: ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '1px'
        }],
        '2xl': ['1.5rem', {
          lineHeight: '2.25rem',
          letterSpacing: '1px'
        }],
        '5xl': ['3rem', {
          lineHeight: '3.5rem',
          letterSpacing: '0.4px'
        }],
        '6xl': ['3.5rem', {
          lineHeight: '4rem',
          letterSpacing: '1.6px'
        }]
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
