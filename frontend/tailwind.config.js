/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                background: '#030712', // gray-950
                surface: '#111827',    // gray-900
                surfaceHighlight: '#1f2937', // gray-800
                border: 'rgba(255, 255, 255, 0.08)',
                primary: {
                    DEFAULT: '#6366f1', // indigo-500
                    hover: '#4f46e5',   // indigo-600
                    glow: 'rgba(99, 102, 241, 0.5)'
                },
                accent: {
                    DEFAULT: '#06b6d4', // cyan-500
                    glow: 'rgba(6, 182, 212, 0.5)'
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
