/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',
        'gold-dark': '#D4AF37', 
        'navy': '#000080',
        'emerald': '#50C878',
        'ruby': '#E0115F',
        'olive': '#556B2F',
        'blush': '#F1D4D4',
      },
    },
  },
  plugins: [],
}