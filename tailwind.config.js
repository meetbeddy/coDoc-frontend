
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B4F5F',
        secondary: '#D3D6D8',
        accent: '#0072B4',
        background: '#F9F9F9',
        text: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
