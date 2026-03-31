/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
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
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'glitch': {
  				'0%': { opacity: '1', filter: 'brightness(1)' },
  				'2%': { opacity: '0', filter: 'brightness(0)' },
  				'4%': { opacity: '1', filter: 'brightness(1)' },
  				'6%': { opacity: '0', filter: 'brightness(0)' },
  				'8%': { opacity: '1', filter: 'brightness(1.5)' },
  				'10%': { opacity: '1', filter: 'brightness(5)' },
  				'12%': { opacity: '0', filter: 'brightness(0)' },
  				'14%': { opacity: '1', filter: 'brightness(2)' },
  				'16%': { opacity: '0.15', filter: 'brightness(0.5)' },
  				'50%': { opacity: '0', filter: 'brightness(0)' },
  				'85%': { opacity: '0', filter: 'brightness(0)' },
  				'88%': { opacity: '0.5', filter: 'brightness(1)' },
  				'90%': { opacity: '0', filter: 'brightness(0)' },
  				'95%': { opacity: '1', filter: 'brightness(2)' },
  				'100%': { opacity: '1', filter: 'brightness(1)' }
  			},
  			'lightning': {
  				'0%': { color: '#000000', textShadow: '0 0 0px #ffffff00', filter: 'brightness(1)' },
  				'35%': { color: '#000000', textShadow: '0 0 0px #ffffff00', filter: 'brightness(1)' },
  				'38%': { color: '#000000', textShadow: '0 0 20px #ffffff, 0 0 40px #ffffff, 0 0 80px #ffffff, 0 0 120px #ffffffaa', filter: 'brightness(2.5)' },
  				'40%': { color: '#000000', textShadow: '0 0 0px #ffffff00', filter: 'brightness(1)' },
  				'42%': { color: '#000000', textShadow: '0 0 20px #ffffff, 0 0 40px #ffffff, 0 0 80px #ffffff, 0 0 120px #ffffffaa', filter: 'brightness(2.5)' },
  				'44%': { color: '#000000', textShadow: '0 0 0px #ffffff00', filter: 'brightness(1)' },
  				'46%': { color: '#000000', textShadow: '0 0 30px #ffffff, 0 0 60px #ffffff, 0 0 120px #ffffff, 0 0 200px #ffffffbb', filter: 'brightness(3)' },
  				'49%': { color: '#000000', textShadow: '0 0 30px #ffffff, 0 0 60px #ffffff, 0 0 120px #ffffff, 0 0 200px #ffffffbb', filter: 'brightness(3)' },
  				'51%': { color: '#000000', textShadow: '0 0 0px #ffffff00', filter: 'brightness(1)' },
  				'100%': { color: '#000000', textShadow: '0 0 0px #ffffff00', filter: 'brightness(1)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'glitch': 'glitch 3s ease-out',
  			'lightning': 'lightning 3.5s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}