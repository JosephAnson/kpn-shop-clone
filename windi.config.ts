import { defineConfig } from '@windicss/plugin-utils';

export default defineConfig({
  /**
   * Write windi classes in html attributes.
   * @see https://windicss.org/features/attributify.html
   */
  attributify: true,
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1280px'
      }
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0077CC',
          '50': '#85CCFF',
          '100': '#70C3FF',
          '200': '#47B2FF',
          '300': '#1FA1FF',
          '400': '#008FF5',
          '500': '#0077CC',
          '600': '#005694',
          '700': '#00365C',
          '800': '#001524',
          '900': '#000000'
        },
        secondary: {
          DEFAULT: '#00c300',
          '50': '#7CFF7C',
          '100': '#67FF67',
          '200': '#3EFF3E',
          '300': '#16FF16',
          '400': '#00EC00',
          '500': '#009900',
          '600': '#008B00',
          '700': '#005300',
          '800': '#001B00',
          '900': '#000000'
        }
      }
    }
  },
  extract: {
    include: ['**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  },
  plugins: [require('windicss/plugin/forms')]
});
