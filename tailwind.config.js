const colors = require("tailwindcss/colors");
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.html", "./src/**/*.tsx"],
  theme: {
    colors: {
      ...colors,
      livepeer: {
        DEFAULT: "#00EB88",
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
