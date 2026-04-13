import daisyui from 'daisyui'
import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".flowbite-react/class-list.json"],
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
    flowbiteReact
  ],
}