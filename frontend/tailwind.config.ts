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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'dark-blue': '#1e2a44',
        'light-blue': '#00aaff',
      },
      fontFamily: {
        'roboto': ['var(--font-roboto)'],
        'nunito': ['var(--font-nunito)'],
      }
    },
  },
  plugins: [],
} satisfies Config;

export default config;
