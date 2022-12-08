/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      boxShadow: {
        't-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        't-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        't-lg': '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        't-xl': '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        't-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
        't-3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        normal: "#a0a29f",
        fighting: "#c44d61",
        flying: "#a6bbe8",
        poision: "#ac6aca",
        ground: "#ce8056",
        rock: "#8bcec1",
        bug: "#9bba48",
        ghost: "#616eb7",
        steel: "#6594a1",
        fire: "#f66d6d",
        water: "#88a3d4",
        grass: "#73b861",
        electric: "#eed967",
        psychic: "#eb8b85",
        ice: "#8bcec1",
        dragon: "#595761",
        dark: "#595761",
        fairy: "#e296e1",
      }
    },
  },
  plugins: [],
}
