/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#5865F2"

      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Set Montserrat as the default sans font
      },
    },
  },
  plugins: [],
};
