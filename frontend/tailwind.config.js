/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        600: "600px",
        1200: "1200px",
      },
    },
  },
  plugins: [],
};
