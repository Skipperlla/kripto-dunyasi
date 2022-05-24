module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {},
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};