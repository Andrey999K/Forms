/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
      },
      boxShadow: {
        custom: 'var(--shadow)',
        'custom-hover': 'var(--shadow-hover)',
      },
      colors: {
        primary: 'var(--color-primary)',
        textPrimary: 'var(--color-text)',
        bgPrimary: 'var(--color-bg)',
        linkActive: 'var(--color-link-active)',
        linkHover: 'var(--color-link-hover)',
        border: 'var(--color-border)',
        bgBase: 'var(--color-bg-base)',
      },
      spacing: {
        'page-layout-offset': '93px',
      },
      keyframes: {
        opacityUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        opacityDown: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeUpGray: {
          '0%': { backgroundColor: 'rgb(192,192,192, 0.5)' },
        },
        scaleUpGreen: {
          '0%': { transform: 'scale(0)' },
          '6%': { transform: 'scale(1)', backgroundColor: 'rgb(0,128,0, 0.4)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        scaleDown: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      animation: {
        opacityUp: 'opacityUp 0.3s ease-in-out forwards',
        opacityDown: 'opacityDown 0.15s ease-in-out forwards',
        fadeUpGray: 'fadeUpGray 5s ease-in-out forwards',
        scaleUpGreen: 'scaleUpGreen 5s ease-in-out forwards',
        scaleUp: 'scaleUp 0.3s ease-in-out forwards',
        scaleDown: 'scaleDown 0.15s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
