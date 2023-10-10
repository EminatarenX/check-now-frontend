/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{jsx,js}"
  ],
  theme: {
    extend: {
      keyframes: {
        entrada: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        salida: {
          '0%': { opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        entrada: 'entrada 1s ease',
        salida: 'salida 1s ease'
      }
    },
  },
  plugins: [],
}

