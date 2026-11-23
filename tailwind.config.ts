import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        leaf: "#4F6F52",
        leafDark: "#3A5340",
        mist: "#E7EEE6",
        paper: "#F8FBF7",
        stem: "#7A9A7E",
      },
      fontFamily: {
        serif: ["var(--font-libre)", "Georgia", "serif"],
        script: ["var(--font-parisienne)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
