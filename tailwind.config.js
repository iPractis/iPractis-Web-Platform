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
        // P1 to P12 (Primary)
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

        // S1 to S12 (Secondary)
        "secondary-color": {
          S1: "#27261F",
          S2: "#615E59",
          S3: "#7B7771",
          S4: "#918E89",
          S5: "#B5B2AD",
          S6: "#C0BDB9",
          S7: "#CECCC7",
          S8: "#DFDDD9",
          S9: "#EAE9E6",
          S10: "#F1F0ED",
          S11: "#F8F7F5",
          S12: "#FBFAF8",
        },

        // SC1 to SC12 (Select && Commercial)
        "tertiary-color": {
          SC1: "#082082",
          SC2: "#0A2594",
          SC3: "#1031B8",
          SC4: "#153CDB",
          SC5: "#1A47FF",
          SC6: "#4166FF",
          SC7: "#7993FF",
          SC8: "#A0B3FF",
          SC9: "#BDCAFF",
          SC10: "#D9E0FA",
          SC11: "#F0F3FF",
          SC12: "#F8F9FD",
        },

        // A1 to A12 (Attention)
        "quaternary-color": {
          A1: "#705E00",
          A2: "#856F00",
          A3: "#AD9200",
          A4: "#D6B400",
          A5: "#FFD600",
          A6: "#FFDD29",
          A7: "#FFE352",
          A8: "#FFEA7A",
          A9: "#FFED8F",
          A10: "#FFF0A3",
          A11: "#F0F3FF",
          A12: "#F8F9FD",
        },

        // VS1 to SU15 (Valid && Success)
        "quinary-color": {
          VS1: "#00701F",
          VS2: "#008525",
          VS3: "#00AD30",
          VS4: "#00D63C",
          VS5: "#00FF47",
          VS6: "#29FF64",
          VS7: "#52FF82",
          VS8: "#7AFF9F",
          VS9: "#8FFFAE",
          VS10: "#A3FFBD",
          VS11: "#B8FFCB",
          SU15: "#CCFFDA",
        },

        // W1 to W15 (Warning)
        "senary-color": {
          W1: "#AA4013",
          W2: "#B64819",
          W3: "#CF5826",
          W4: "#E76832",
          W5: "#FF783F",
          W6: "#FF9264",
          W7: "#FFAC89",
          W8: "#FFC5AD",
          W9: "#FFD2C0",
          W10: "#FFDFD2",
          W11: "#FFECE5",
          W15: "#FFF9F7",
        },

        // MA1 to A1 (Mistake & Alert)
        "septenary-color": {
          MA1: "#700007",
          MA2: "#850009",
          MA3: "#AD000B",
          MA4: "#D6000E",
          MA5: "#FF0011",
          MA6: "#FF2937",
          MA7: "#FF525D",
          MA8: "#FF7A83",
          MA9: "#FF8F96",
          MA10: "#FFA3A9",
          MA11: "#FFB8BC",
          A15: "#FFCCCF",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
