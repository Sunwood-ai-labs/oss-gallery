import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        "skew-scroll": "skew-scroll 20s linear infinite",
        "infinite-scroll": "infinite-scroll 20s linear infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        "skew-scroll": {
          "0%": {
            transform:
              "rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-20%)",
          },
          "100%": {
            transform:
              "rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-120%)",
          },
        },
        "infinite-scroll": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-200%)",
          },
        },
      },
      colors: {
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: colors.gray[200],
          },
          ring: {
            DEFAULT: colors.gray[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};

export default config;
