import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                netflixNavy: "#0f0f1a",
                deepSpace: "#1a1a2e",
                goldAccent: "#FFD700",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "sans-serif"],
                serif: ["var(--font-cinzel)", "Georgia", "serif"],
            },
            animation: {
                "float": "float 20s infinite linear",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                float: {
                    "0%": { transform: "translateY(0) rotate(0deg)" },
                    "100%": { transform: "translateY(-100vh) rotate(360deg)" },
                }
            }
        },
    },
    plugins: [],
} satisfies Config;
