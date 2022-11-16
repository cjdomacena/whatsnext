/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#1c1c1e",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/line-clamp")],
};
