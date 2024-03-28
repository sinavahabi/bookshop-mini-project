/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '240': '240px',
        '250': '250px',
        '260': '260px',
        '300': '300px'
      },
      height: {
        '400': '400px',
        '500': '500px',
        '600': '600px',
        '700': '700px',
        '800': '800px'
      },
      minHeight: {
        '50': '50px',
        '100': '100px',
        '250': '250px',
        '300': '300px',
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