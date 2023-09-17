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
      backgroundImage: {
        "radio-defalt": 'url("/icons/radio-defalt.svg")',
        "radio-hover": 'url("/icons/radio-hover.svg")',
        "radio-focus": 'url("/icons/radio-focus.svg")',
        "checkbox-defalt": 'url("/icons/checkbox-defalt.svg")',
        "checkbox-hover": 'url("/icons/checkbox-hover.svg")',
        "checkbox-focus": 'url("/icons/checkbox-focus.svg")',
      },
      colors: {
        "point-green": "#34ffc2",
        "point-purple": "#6c48f9",
        "bg-green": "#bcffea",
      },
    },
  },
  plugins: [],
};
