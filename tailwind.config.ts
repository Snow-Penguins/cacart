import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: "390px",
      desktop: "1440px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        h1: [
          "60px",
          {
            lineHeight: "72px",
            fontWeight: "700",
          },
        ],
        h2: [
          "48px",
          {
            lineHeight: "58px",
            fontWeight: "700",
          },
        ],
        h3: [
          "40px",
          {
            lineHeight: "48px",
            fontWeight: "700",
          },
        ],
        h4: [
          "30px",
          {
            lineHeight: "38px",
            fontWeight: "700",
          },
        ],
        h5: [
          "28px",
          {
            lineHeight: "40px",
            fontWeight: "600",
          },
        ],
        h6: [
          "24px",
          {
            lineHeight: "30px",
            fontWeight: "600",
          },
        ],
        "body-lg": ["18px", "26px"],
        "body-md": ["16px", "24px"],
        "body-sm": ["14px", "22px"],
        "body-xsm": ["12px", "20px"],
      },
    },
    colors: {
      transparent: "transparent",
      primary: "#3758F9",
      secondary: "#13C296",
      primary_text: "#637381",
      secondary_text: "#8899A8",
      stroke: "#DFE4EA",
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        100: "#F9FAFB",
        200: "#F3F4F6",
        300: "#E5E7EB",
        400: "#DEE2E6",
        500: "#CED4DA",
      },
      orange: {
        dark: "#E1580E",
        light: "#F59460",
      },
      red: {
        dark: "#E10E0E",
        light: "#F56060",
      },
      blue: {
        DEFAULT: "#2D68F8",
        100: "#E1E8FF",
        200: "#C3CEF6",
        300: "#ADBCF2",
        400: "#8099EC",
        500: "#5475E5",
        600: "#1C3FB7",
      },
      cyan: {
        DEFAULT: "#01A9DB",
        100: "#D0F0FD",
        200: "#77D1F3",
        300: "#18BFFF",
        400: "#0B76B7",
      },
      teal: {
        DEFAULT: "#02AAA4",
        100: "#C2F5E9",
        200: "#72DDC3",
        300: "#20D9D2",
        400: "#06A09B",
      },
      green: {
        dark: "#1A8245",
        light: "#2CD673",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
