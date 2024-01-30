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
      colors: {
        parchment: "#FCF5E5",
        parchmentDark: '#7B9095',
        brown: {
          800: '#5b3a29', // Dark brown for text
          600: '#806517', // Brown for borders
        },
        amber: {
          100: '#f4e9d8', // Light parchment color for background
          600: '#DAA520', // Gold color for buttons
        },
      }
    },
    
  },
  plugins: [],
};
export default config;
