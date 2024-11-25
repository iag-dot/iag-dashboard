/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
      "./src/**/*.{html,js,jsx,ts,tsx}", // Cover HTML, JS, JSX, TS, TSX files in src
      "./public/index.html"               // Include index.html if using it for Tailwind
  ],
  theme: {
      extend: {
          borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)'
          },
          colors: {},
          fontFamily: {
            'ambit':['ambit']
          },
      }
  },
  plugins: [require("tailwindcss-animate")],
}
