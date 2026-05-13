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
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        wave: {
          '0%': { transform: 'skewY(-0.5deg)' },
          '25%': { transform: 'skewY(0.5deg)' },
          '50%': { transform: 'skewY(-0.5deg)' },
          '75%': { transform: 'skewY(0.5deg)' },
          '100%': { transform: 'skewY(-0.5deg)' },
        },
        floatWave: {
          '0%, 100%': { transform: 'translateY(0px) skewY(-0.5deg)' },
          '25%': { transform: 'translateY(-12px) skewY(0.5deg)' },
          '50%': { transform: 'translateY(-25px) skewY(-0.5deg)' },
          '75%': { transform: 'translateY(-12px) skewY(0.5deg)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        wave: 'wave 3s ease-in-out infinite',
        floatWave: 'floatWave 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

