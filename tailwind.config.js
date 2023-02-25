/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    focus: {
      border: 0,
    },
    extend: {
      fontFamily: {
        general: ["var(--font-general)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        beige: "#F4F2EF",
        green: "#83F2BD",
        "light-green": "#F2FFCD",
        "dark-blue": "#181A33",
        "dark-greige": "#E9E7E5",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontFamily: theme("fontFamily.general"),
          fontSize: theme("fontSize.5xl"),
          lineHeight: theme("lineHeight.tight"),
        },
        h2: {
          fontFamily: theme("fontFamily.general"),
          fontSize: theme("fontSize.4xl"),
          lineHeight: theme("lineHeight.tight"),
        },
        h3: {
          fontFamily: theme("fontFamily.general"),
          fontSize: theme("fontSize.3xl"),
          lineHeight: theme("lineHeight.tight"),
        },
        h4: {
          fontFamily: theme("fontFamily.general"),
          fontSize: theme("fontSize.2xl"),
          lineHeight: theme("lineHeight.tight"),
        },
      });
    }),
    require("@tailwindcss/forms"),
  ],
};
