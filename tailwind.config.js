/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      order: {
        '1':'1',
        '2':'2',
        '3':'3',
        '4':'4',
        '5':'5',
        '6':'6',
        '7':'7',
    },
    boxShadow: {
      '3xl': '0px 2px 3px 2px rgba(0, 0, 0, 0.3);',
    },
    },
  },
  plugins: [],
}