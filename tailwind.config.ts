import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#FBF7EF",
        parchmentDark: "#C6B8A4",
        darkWood: "#5A4034",
        night: "#7A6A64",
        ink: "#3A2A24",
        ember: "#D9A39B",
        brass: "#E7D1AE",
        mist: "#F7F1E8",
        slate: "#5D4F47",
        brown: {
          800: "#6A4B3A",
          600: "#9B7A5F",
        },
        amber: {
          100: "#FFF2CF",
          600: "#C7A96D",
        },
        lightParchment: "#F6EEE5",
        mapParchment: "#FEFBF6",
      },
    },
  },
  plugins: [],
};
export default config;
