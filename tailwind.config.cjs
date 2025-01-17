/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        authImg: "url('/sky.jpg')",
      },
      spacing: {
        'page-layout-offset': '93px',
      },
    },
  },
  plugins: [],
};
