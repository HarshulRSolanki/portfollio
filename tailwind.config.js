/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#0A0A0A',
        surface: '#141414',
        surfaceHover: '#1A1A1A',
        borderDark: '#252525',
        ocean: {
          DEFAULT: '#007BA7',
          hover: '#00648A',
          light: '#0096CC',
          glow: 'rgba(0, 123, 167, 0.3)',
        },
        pinkAccent: {
          DEFAULT: '#FF2D75',
          hover: '#E02265',
          light: '#FF5C93',
          glow: 'rgba(255, 45, 117, 0.25)',
        },
        textPrimary: '#FFFFFF',
        textSecondary: '#A1A1AA',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'ocean-glow': '0 8px 30px -6px rgba(0, 123, 167, 0.35)',
        'pink-glow': '0 8px 30px -6px rgba(255, 45, 117, 0.3)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.65)',
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
