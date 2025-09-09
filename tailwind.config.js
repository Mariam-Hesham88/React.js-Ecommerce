/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      main: "#000",
      second: "#2E485D",
      true: "#01AB31",
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

