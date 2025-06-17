/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",      // if you use the /app directory
      "./pages/**/*.{js,ts,jsx,tsx}",    // if you have any /pages
      "./components/**/*.{js,ts,jsx,tsx}"// your shared components
    ],
    theme: {
      extend: {
        colors: {
          // your custom gold
          'shimmer-gold': '#FFD700',
        }
      }
    },
    plugins: [],
  }
  