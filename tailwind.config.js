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
          'Noto Sans',
          'Noto Sans SC',
          'Noto Sans JP',
          'Noto Sans KR',
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
