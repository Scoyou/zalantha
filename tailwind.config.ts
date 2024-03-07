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
        parchment: "#FCF5E5",
        parchmentDark: "#7B9095",
        darkWood: "#3D1A02",
        brown: {
          800: "#5b3a29",
          600: "#806517",
        },
        amber: {
          100: "#FFF4C9",
          600: "#DAA520",
        },
        lightParchment: "#F4EADE",
        mapParchment: "#FAF8F5",
      },
    },
  },
  plugins: [],
};
export default config;
