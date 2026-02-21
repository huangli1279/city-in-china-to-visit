/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        'app': '480px',
        'desktop': '1120px',
        'shell': '1280px',
      },
      boxShadow: {
        'panel': '0 20px 45px -26px rgba(15, 23, 42, 0.32)',
      },
    },
  },
  plugins: [],
}
