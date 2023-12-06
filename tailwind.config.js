// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['hover'], // Enable hover variants for backgroundColor
      textColor: ['hover'], // Enable hover variants for textColor
    },
  },
};
