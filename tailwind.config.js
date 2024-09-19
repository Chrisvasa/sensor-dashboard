/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include shadcn/ui components
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
		backgroundImage: {
			'bg-image': "url('/src/assets/bg.jpg",
			'custom-pattern': `linear-gradient(30deg, black 12%, transparent 12.5%, transparent 87%, black 87.5%, black),
                          linear-gradient(150deg, black 12%, transparent 12.5%, transparent 87%, black 87.5%, black),
                          linear-gradient(30deg, black 12%, transparent 12.5%, transparent 87%, black 87.5%, black),
                          linear-gradient(150deg, black 12%, transparent 12.5%, transparent 87%, black 87.5%, black),
                          linear-gradient(60deg, rgba(0, 0, 0, 0.7) 25%, transparent 25.5%, transparent 75%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.7)),
                          linear-gradient(60deg, rgba(0, 0, 0, 0.7) 25%, transparent 25.5%, transparent 75%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.7))`,
		},
		backgroundSize: {
			'custom-size': '40px 70px',
		},
		backgroundPosition: {
			'custom-position': '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px',
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		fontFamily: {
			sans: ['Inter var', ...defaultTheme.fontFamily.sans],
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
