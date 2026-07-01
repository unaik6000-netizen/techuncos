import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        subtle: "var(--subtle)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        faint: "var(--faint)",
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        input: "var(--input)",
        ring: "var(--ring)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        brand: {
          cyan: "var(--brand-cyan)",
          sky: "var(--brand-sky)",
          blue: "var(--brand-blue)",
        },
        cat: {
          ai: "var(--cat-ai)",
          tech: "var(--cat-tech)",
          digital: "var(--cat-digital)",
          tutorials: "var(--cat-tutorials)",
          news: "var(--cat-news)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        malayalam: ["var(--font-malayalam)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        container: "1200px",
        wide: "1440px",
        prose: "720px",
      },
      borderRadius: {
        card: "16px",
        panel: "24px",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #22D3EE 0%, #38BDF8 50%, #3B82F6 100%)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "glow-drift": {
          "0%, 100%": { opacity: "0.5", transform: "translate(0, 0) scale(1)" },
          "50%": {
            opacity: "0.8",
            transform: "translate(2%, -2%) scale(1.05)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "glow-drift": "glow-drift 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
