import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1F3B",
        secondary: "#2ED3E6",
        accent: "#2ECC71",
        background: "#F7F9FC",
        text: "#222831"
      }
    }
  },
  plugins: []
};

export default config;
