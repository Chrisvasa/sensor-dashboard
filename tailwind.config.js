/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
        'mac': 'rgba(0, 0, 0, 0.2) 0px 20px 30px',
        'clean': 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
        'img': 'box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          100: 'rgb(121, 134, 203)',   // Soft, muted periwinkle blue
          200: 'rgb(92, 107, 192)',    // Slightly deeper blue-purple
          300: 'rgb(63, 81, 181)',     // Deep blue with a hint of purple
          400: 'rgb(48, 63, 159)',     // Stronger and darker blue for emphasis
          500: 'rgb(40, 53, 147)',     // Rich, vibrant indigo for main components
          600: 'rgb(26, 35, 126)'      // Dark indigo for hover or active states
        },               
        dark: {
          100: 'rgb(24, 24, 28)',      // Very dark background (main background)
          200: 'rgb(38, 38, 44)',      // Dark but with slightly more brightness for secondary backgrounds
          300: 'rgb(51, 51, 58)',      // Medium-dark for card backgrounds
          400: 'rgb(66, 66, 74)',      // Slightly lighter for elements that need to pop
          500: 'rgb(89, 89, 99)',      // Even lighter for subtle accents or borders
          600: 'rgb(118, 118, 130)'    // For elements that should be more prominent
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        main: 'rgb(229, 229, 229)',
        title: 'rgb(147, 147, 147)',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
