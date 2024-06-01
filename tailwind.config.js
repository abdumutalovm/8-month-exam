/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-black': 'rgb(18, 18, 18)',
        'custom-yellow': 'rgb(221, 246, 40)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(18, 18, 18, 1) 80%, rgb(221, 246, 40) 100%)',
      },
      fontFamily: {
        circular: ['CircularStd', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
