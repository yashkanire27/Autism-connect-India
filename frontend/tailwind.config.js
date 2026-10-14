/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        skybrand: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FDFBF7',
          200: '#F7F3EA',
          300: '#EFE9DC',
        },
        sage: {
          50: '#F2F9F6',
          100: '#E3F2EC',
          500: '#10B981',
          600: '#059669',
        },
        softcoral: {
          50: '#FFF5F3',
          100: '#FFE6E2',
          500: '#FF6B6B',
          600: '#EE5253',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(124, 58, 237, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 20px 40px -15px rgba(124, 58, 237, 0.1), 0 8px 24px -4px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}
