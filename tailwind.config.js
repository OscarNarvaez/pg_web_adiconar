/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f766e',
        primaryDark: '#115e59',
        accent: '#f59e0b',
        ink: '#0f172a',
        mist: '#f1f5f9',
      },
    },
  },
  plugins: [],
}

