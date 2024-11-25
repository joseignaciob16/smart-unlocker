/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#011826',
        secondary: '#37748C',
        tertiary: '#4BD898',
      }
    },
  },
  plugins: [],
}

