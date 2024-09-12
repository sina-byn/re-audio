/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/samples/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#58c4dc',
        light: 'rgb(218 221 225)',
        dark: 'var(--ifm-footer-background-color)',
        darker: 'var(--ifm-background-color)',
      },
    },
  },
  plugins: [],
};
