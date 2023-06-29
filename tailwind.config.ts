import type { Config } from 'tailwindcss'

export default {
  darkMode: "class",
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: '1rem',

      // default breakpoints but with 40px removed
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1496px',
      },
    },
    extend:{
      fontFamily: {
        sans: ["Reggae One", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
        bellefair: ["Bellefair", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#FFCC33",
          dark: "#FFA500",
          light: "#FFFF99",
        },
        secondary: {
          DEFAULT: "#38bc95",
          dark: "#00BFFF",
          light: "#9FE2BF",
        },
      }
    }
  },
  plugins: [],
} satisfies Config

