/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue, js, ts}'],
  prefix: 'tw-',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Graphik', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-primary': '#7823DC',
        'brand-primary-disabled': '#C8A5F0',
        'brand-secondary-10': '#E6E6E6',
        'brand-secondary-20': '#D2D2D2',
        'brand-gray-1': '#F5F5F5',
        'brand-gray-2': '#DBDBDB',
        'brand-gray-3': '#A5A5A5',
        'brand-gray-4': '#EDEDED',
        'brand-red-1': '#DC3545',
        'brand-red-2': 'rgba(255, 52, 41, 0.6)',
        'brand-green-1': '#04BB46',
        'brand-green-2': 'rgba(4, 187, 70, 0.6)',
        'brand-green-3': '#F0FDF5',
        'brand-yellow-1': '#FF9900',
        'brand-yellow-2': 'rgba(255, 193, 7, 0.6)',
      },
    },
    screens: {
      'small-laptop': { max: '1439px' },

      desktop: { min: '1440px', max: '1919px' },
    },
  },
  plugins: [],
};
