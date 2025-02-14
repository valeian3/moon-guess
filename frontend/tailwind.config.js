/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

export default {
    darkMode: "class",
    content: ["./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                'progress-bar': 'progress 2s linear infinite',
            },
            keyframes: {
                progress: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
            },
            colors: {
                ...colors,
                primary: { "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81", "950": "#1e1b4b" }
            },

            screens: {
                tablet: '640px',
                // => @media (min-width: 640px) { ... }

                laptop: '1024px',
                // => @media (min-width: 1024px) { ... }

                desktop: '1280px',
                // => @media (min-width: 1280px) { ... }

                ...defaultTheme.screens
            }
        }
    },
    plugins: [],
}