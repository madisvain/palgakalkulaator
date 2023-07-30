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
      const lg = theme("screens.lg", {});

      addBase({
        h1: {
          fontFamily: theme("fontFamily.general"),
          fontSize: "56px",
          lineHeight: 1.2,
        },
        h2: {
          fontFamily: theme("fontFamily.general"),
          fontSize: "48px",
          lineHeight: 1.2,
        },
        h3: {
          fontFamily: theme("fontFamily.general"),
          fontSize: "40px",
          lineHeight: 1.3,
        },
        h4: {
          fontFamily: theme("fontFamily.general"),
          fontSize: "32px",
          lineHeight: 1.3,
          [`@media (max-width: ${lg})`]: {
            fontSize: "24px",
          },
        },
        h5: {
          fontFamily: theme("fontFamily.general"),
          fontSize: "24px",
          lineHeight: 1.3,
        },
        h6: {
          fontFamily: theme("fontFamily.general"),
          fontSize: "20px",
          lineHeight: 1.3,
        },
      });
    }),
    require("@tailwindcss/forms"),
  ],
};
