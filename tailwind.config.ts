import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0c0a09",
          soft: "#1c1917",
          muted: "#44403c",
        },
        paper: {
          DEFAULT: "#faf7f2",
          card: "#ffffff",
          line: "#e7e2d9",
        },
        masa: {
          // warm "corn tortilla" accent — nods to the taco metaphor without being literal
          50: "#fdf6e9",
          100: "#f8e7c2",
          200: "#f1cf86",
          300: "#e8b14a",
          400: "#df9a22",
          500: "#c87f12",
          600: "#a4630f",
          700: "#824c12",
          800: "#6b3f15",
          900: "#5a3514",
        },
        chili: {
          400: "#e4572e",
          500: "#c73e1d",
          600: "#a32f15",
        },
        lime: {
          500: "#3f7d20",
          600: "#2f6018",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "rise": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        rise: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 28s linear infinite",
        "pulse-soft": "pulse-soft 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
