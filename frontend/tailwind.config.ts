import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        "tablet" : "480px",
        "small-screen" : "769px",
        "medium-screen" : "1024px",
        "normal-screen" : "1280px",
        "large-screen" : "1536px",
      },
      colors: {
        "Primary" : "#5D8D7B",
        "Secondary" : "#E25933",
        "Background" : "#0F0F0F",
        "Highlight" : "#151515",
        "Text" : "#5E5E5E",
        "Neutral" : "#fafaff",
        "Success" : "#4CAF50"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
export default config
