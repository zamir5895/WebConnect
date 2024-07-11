/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textColor: ['responsive', 'hover', 'focus'],
      textDecoration: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}
