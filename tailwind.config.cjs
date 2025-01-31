/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
      },
      colors: {
        colorPrimary: '#fa9145',
        colorTextBase: '#885028',
        colorBgBase: '#fdf8f4',
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
        scaleUp: 'scaleUp 0.3s ease-in-out forwards',
        scaleDown: 'scaleDown 0.15s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
