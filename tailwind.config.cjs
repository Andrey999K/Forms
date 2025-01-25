/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        colorPrimary: '#fa9145',
        colorTextBase: '#885028',
        colorBgBase: '#fdf8f4',
      },
      backgroundImage: {
        authImg: "url('/sky.jpg')",
      },
      spacing: {
        'page-layout-offset': '93px',
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        scaleUp: 'scaleUp 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
