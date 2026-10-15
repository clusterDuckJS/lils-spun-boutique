/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#111B49',
          'navy-dark': '#0B1233',
          'navy-light': '#1A296D',
          ivory: '#FAF7F2',
          'ivory-light': '#FCFAF7',
          'ivory-muted': '#F2EDE4',
          blush: '#E8CDD0',
          'blush-light': '#F6ECEE',
          'blush-soft': '#FAF0F2',
          lavender: '#DCD6E8',
          'lavender-light': '#F0EDF7',
          champagne: '#D8C4A5',
          'champagne-light': '#F0E7D8',
          rose: '#B77C88',
          'rose-dark': '#965A67',
          text: '#252438',
          muted: '#77717B',
          'muted-light': '#9D97A2',
          border: '#EAE4DF',
          'border-light': '#F3EFEB',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(17, 27, 73, 0.05)',
        'card': '0 8px 30px -4px rgba(17, 27, 73, 0.08)',
        'elevated': '0 20px 40px -8px rgba(17, 27, 73, 0.12)',
        'dropdown': '0 10px 40px -5px rgba(17, 27, 73, 0.15)',
      },
      letterSpacing: {
        'widest-plus': '0.25em',
        'luxury': '0.18em',
      }
    },
  },
  plugins: [],
}
