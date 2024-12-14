/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [daisyui],
}

