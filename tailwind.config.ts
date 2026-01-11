import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        body: "var(--body-bg)",
        "body-alt": "var(--body-bg-alt)",
        text: "var(--body-color)",
        border: "var(--border-color)",

        primary: "var(--primary)",
        "primary-soft": "var(--primary-soft)",

        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      borderRadius: {
        phoenix: "0.375rem",
      },
      boxShadow: {
        phoenix: "0 0.5rem 1.25rem rgba(0,0,0,.05)",
      },
    },
  },
  plugins: [],
} satisfies Config;
