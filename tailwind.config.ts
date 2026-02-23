import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  future: {
    optimizeUniversalDefaults: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['IBM Plex Serif', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Badge-specific radius
        badge: "16px",
      },
      fontSize: {
        // Badge-specific font size
        badge: "13px",
      },
      spacing: {
        // Badge-specific spacing
        2.5: "10px",
      },
      gap: {
        1.5: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
