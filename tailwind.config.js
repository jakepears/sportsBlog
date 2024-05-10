/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.handlebars', './views/layouts/**/*.handlebars'],
  theme: {
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      grayDark: '#2d2d2d',
      gray: '#8492a6',
      offWhite: '#fafafa',
      grayLight: '#f2f2f2',
    },
    fontFamily: {
      sans: ['Roboto', 'sans'],
      serif: ['Roboto', 'serif'],
    },
  },
  plugins: [],
};
