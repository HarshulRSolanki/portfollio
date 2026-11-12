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
        void: 'var(--bg-primary)',
        surface: 'var(--bg-card)',
        surfaceHover: 'var(--bg-elevated)',
        borderDark: 'var(--border-color)',
        ocean: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-primary-hover)',
          light: 'var(--accent-primary-badge-text)',
        },
        pinkAccent: {
          DEFAULT: 'var(--accent-secondary)',
          hover: 'var(--accent-secondary-hover)',
          light: 'var(--accent-secondary-badge-text)',
        },
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'ocean-glow': 'var(--shadow-primary)',
        'pink-glow': '0 8px 30px -6px var(--accent-secondary-soft)',
        'card': 'var(--shadow-card)',
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
