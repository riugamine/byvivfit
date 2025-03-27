/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'black': '#1C1C1C', // PANTONE NEUTRAL BLACK C
        'coral': '#FF5757', // PANTONE 178 C
        'salmon': '#FF8C69', // PANTONE 170 C
        'peach': '#FFB088', // PANTONE 162 C
        'apricot': '#FFD4A7', // PANTONE 162 C Light
      },
      fontFamily: {
        'agrandir': ['Agrandir', 'sans-serif'],
        'opensauce': ['Open Sauce', 'sans-serif'],
      },
    },
  },
  plugins: [],
}