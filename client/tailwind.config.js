/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}', // include all component and page files
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')], // Optional: enables `prose` classes
}
