/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#191624',
        //for received msg and hover
        light: ' #E6EBF5',
        //for nav
        lighter: '#F5F7FB',
        //for bg
        darkest: '#252c3b',
        //for nav
        darker: '#303841',
        //for received msg and hover
        dark: '#36404A',
        main: '#7269EF',
        'main-dark': '#5c54df',
        'main-light': '#5f58eb81',
      },
    },
  },

  plugins: [],
};
