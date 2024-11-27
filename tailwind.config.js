import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": {
          P1: "#1C1C1E",
          P2: "#2C2C2E",
          P3: "#3A3A3C",
          P4: "#48484A",
          P5: "#636366",
          P6: "#8E8E93",
          P7: "#AEAEB2",
          P8: "#C7C7CC",
          P9: "#D1D1D6",
          P10: "#E5E5EA",
          P11: "#F2F2F7",
          P12: "#FFFFFF",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
