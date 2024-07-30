import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#E0563B",
      white100: "#FFF",
      white95: "#F8F8F8",
      black: "#000",
      white90: "#EDEDED",
      gray80: "#333",
      gray60: "#c6c6c6",
      gray40: "#eee",
    },
  },
  plugins: [],
};
export default config;
