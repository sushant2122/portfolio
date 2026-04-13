import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-black': '#1D283C',
        'primary-gold': '#D3AF37',
        'secondary-gray': '#8e9aa0',
      },
    },
  },
  plugins: [
    daisyui,
  ],
}

