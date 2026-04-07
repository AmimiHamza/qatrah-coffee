/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#2c1810',
          50: '#f9f0eb',
          100: '#edd9ce',
          200: '#d9aa92',
          300: '#c47b58',
          400: '#a05030',
          500: '#7a3520',
          600: '#5e2416',
          700: '#47190f',
          800: '#2c1810',
          900: '#160c08',
        },
        gold: {
          DEFAULT: '#F1E49A',
          50: '#fefdf0',
          100: '#fdfadc',
          200: '#faf3b3',
          300: '#f7eb8a',
          400: '#F1E49A',
          500: '#e8d55a',
          600: '#d4bc20',
          700: '#a89218',
          800: '#7c6c11',
          900: '#50450b',
        },
        cream: {
          DEFAULT: '#FEF4D5',
          50: '#ffffff',
          100: '#fffef8',
          200: '#FEF4D5',
          300: '#fde9a8',
          400: '#fbdd7a',
          500: '#f9d04c',
          600: '#f5c218',
          700: '#c89b0e',
          800: '#957309',
          900: '#624c04',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'steam': 'steam 2s ease-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        steam: {
          '0%': { opacity: '0.8', transform: 'translateY(0) scaleX(1)' },
          '100%': { opacity: '0', transform: 'translateY(-60px) scaleX(1.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 1%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -2%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 1%)' },
          '80%': { transform: 'translate(3%, 3%)' },
          '90%': { transform: 'translate(-1%, -2%)' },
        },
      },
      backgroundImage: {
        'grain-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
