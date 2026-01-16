/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a', // Deep black
                surface: '#111111',
                primary: '#6b21a8', // Deep purple 700
                secondary: '#d8b4fe', // Purple 300 (Neon-ish)
                accent: '#c084fc', // Purple 400
                glass: 'rgba(255, 255, 255, 0.08)',
                'glass-hover': 'rgba(255, 255, 255, 0.12)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #6b21a8' },
                    '100%': { boxShadow: '0 0 20px #d8b4fe' },
                }
            }
        },
    },
    plugins: [],
}
