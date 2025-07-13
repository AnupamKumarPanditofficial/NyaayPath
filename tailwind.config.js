/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'deep-blue': '#1E3A8A',
        'accent-orange': '#F97316',
        'success-green': '#16A34A',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'draw-line': 'draw-line 2s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #F97316, 0 0 10px #F97316, 0 0 15px #F97316' },
          '100%': { boxShadow: '0 0 10px #F97316, 0 0 20px #F97316, 0 0 30px #F97316' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'draw-line': {
          '0%': { strokeDasharray: '0 100' },
          '100%': { strokeDasharray: '100 0' },
        },
      },
    },
  },
  plugins: [],
};