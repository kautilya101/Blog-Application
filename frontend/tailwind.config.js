/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#6B705C',
        'secondary':'#A5A58D',
        'accent':'#CB997E',
        'text':'#3A3A3A',
        'background':'#F0EDE5',
      }
    },
  },
  plugins: [],
}

