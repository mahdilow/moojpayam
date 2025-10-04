/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Yekan Bakh', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: '#EEF7FF',
          100: '#D6EBFF',
          200: '#A8D5FF',
          300: '#7ABEFF',
          400: '#4CA7FF',
          500: '#4A90E2',
          600: '#3B73B5',
          700: '#2C5688',
          800: '#1D395B',
          900: '#0E1D2E',
        },
        secondary: {
          50: '#F7F1FF',
          100: '#EEE3FF',
          200: '#DCC7FF',
          300: '#CBABFF',
          400: '#B98FFF',
          500: '#9B6DFF',
          600: '#7C57CC',
          700: '#5D4199',
          800: '#3E2B66',
          900: '#1F1633',
        },
        accent: {
          50: '#FFF2F0',
          100: '#FFE5E1',
          200: '#FFCBC3',
          300: '#FFB1A5',
          400: '#FF9787',
          500: '#FF7E5F',
          600: '#CC654C',
          700: '#994C39',
          800: '#663326',
          900: '#331913',
        },
      },
      fontFamily: {
        vazir: ['Yekan Bakh', 'sans-serif'],
        comfortaa: ['Yekan Bakh', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'bounce-light': 'bounce-light 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-shift': 'gradient-shift 10s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'bounce-light': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
            'background-size': '200% 200%'
          },
          '50%': {
            'background-position': '100% 50%',
            'background-size': '200% 200%'
          },
        },
        'gradient-shift': {
          '0%': { 'transform': 'translateX(-25%)' },
          '50%': { 'transform': 'translateX(0%)' },
          '100%': { 'transform': 'translateX(25%)' },
        },
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};