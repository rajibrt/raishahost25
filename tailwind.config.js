/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}", "./styles/**/*.css"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0F5BD2", dark: "#0B46A2", gold: "#D4AF37" }
      }
    }
  },
  plugins: []
};
