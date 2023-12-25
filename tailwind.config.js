/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '250': '250px'
      },
      height: {
        '400': '400px',
        '500': '500px',
        '600': '600px',
        '700': '700px',
        '800': '800px'
      }, minHeight: {
        '400': '400px',
        '500': '500px',
        '600': '600px',
        '700': '700px',
        '800': '800px'
      }
    }
  },
  plugins: [],
}