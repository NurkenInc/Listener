/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      './src/**/*.{html,js,tsx}',
      './components/**/*.{html,js,tsx}',
      './sections/**/*.{html,js,tsx}',
      './styles/**/*.{js,tsx}',
    ],
    mode: 'jit',
    theme: {
      extend: {
        colors: {
          'primary-black': '#1A232E',
          'secondary-white': '#c7c7c7',
        },
        transitionTimingFunction: {
          'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
        },
      },
    },
    plugins: [],
  };
  