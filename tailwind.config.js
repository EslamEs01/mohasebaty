/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './pages/**/*.html',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#F4F1EA', 2: '#EFEBE2' },
        paper: '#FFFFFF',
        line: { DEFAULT: '#E6E1D5', soft: '#EFEBE0' },
        ink: { DEFAULT: '#14181F', 2: '#2A323E', 3: '#5C6573', 4: '#8A93A1' },
        primary: { DEFAULT: '#0E6F66', ink: '#0A4F49', soft: '#E5F0EE' },
        gold: { DEFAULT: '#B68A3E', soft: '#F4ECDA' },
        rose: { DEFAULT: '#B83A3A', soft: '#F7E4E4' },
        amber: { DEFAULT: '#A06A0F', soft: '#F6E9CC' },
        green: { DEFAULT: '#2F7A4E', soft: '#E1EFE6' },
        slate: { DEFAULT: '#4A5365', soft: '#ECEEF2' },
      },
      fontFamily: {
        sans: [
          '"IBM Plex Sans Arabic"',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Tahoma',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"IBM Plex Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '22px',
      },
      boxShadow: {
        sm: '0 1px 0 rgba(20,24,31,.04), 0 1px 2px rgba(20,24,31,.04)',
        md: '0 1px 0 rgba(20,24,31,.04), 0 6px 18px -8px rgba(20,24,31,.10)',
        lg: '0 1px 0 rgba(20,24,31,.04), 0 24px 50px -28px rgba(20,24,31,.22)',
      },
      maxWidth: {
        app: '1320px',
        'app-wide': '1480px',
      },
    },
  },
  plugins: [],
};
