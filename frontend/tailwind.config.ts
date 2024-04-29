import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        tablet: "480px",
        "small-screen": "769px",
        "medium-screen": "1024px",
        "normal-screen": "1280px",
        "large-screen": "1536px",
      },
      colors: {
        background: "#000000",
        primary: {
          "50": "#F9F9F9",
          "100": "F1F1F1",
          "200": "#E2E2E2",
          "300": "#CCCCCC",
          "400": "#A5A5A5",
          "500": "#777777",
          "600": "#4B4B4B",
          "700": "#2E2E2E",
          "800": "#1B1B1B",
          "900": "#111111",
          "1000": "#070707",
        },
        danger: {
          "50": "#FEF8F8",
          "100": "#FDEDED",
          "200": "#FBDBDC",
          "300": "#F8BDBF",
          "400": "#F48688",
          "500": "#E22E38",
          "600": "#931A21",
          "700": "#5F0D12",
          "800": "#3D0508",
          "900": "#2A0304",
          "1000": "#180102",
        },
        success: {
          "50": "#EAFEF1",
          "100": "#C7FDD9",
          "200": "#73FCAD",
          "300": "#49E693",
          "400": "#39BC77",
          "500": "#278754",
          "600": "#155634",
          "700": "#0A351E",
          "800": "#0A351E",
          "900": "#021509",
          "1000": "#010A04",
        },
        warning: {
          "50": "#FFF8F1",
          "100": "#FFEEDB",
          "200": "#FFDDB2",
          "300": "#FFC249",
          "400": "#D49C00",
          "500": "#997000",
          "600": "#624700",
          "700": "#3E2B00",
          "800": "#261900",
          "900": "#190F00",
          "1000": "#0D0600",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
