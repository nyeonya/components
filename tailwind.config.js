/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      //커스텀 가능
      colors: {
        "point-green": "#34ffc2",
        "point-purple": "#6c48f9",
        "bg-green": "#bcffea",
      },
    },
  },
  plugins: [],
};
