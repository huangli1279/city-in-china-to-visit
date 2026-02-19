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
      },
    },
  },
  plugins: [],
}
