/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/navigation/MainNavigation.js",
    "./src/components/navigation/Pagination.js",
    "./src/components/navigation/Footer.js",

    "./src/components/homepage/Title.js",
    "./src/components/homepage/PrvaSlika.js",
    "./src/components/homepage/Content.js",
    "./src/components/homepage/PrikazKategorija.js",
    "./src/components/homepage/FullContent.js",
    "./src/components/homepage/SinglePost.js",

    "./src/components/detailPage/Title.js",
    "./src/components/detailPage/Image.js",
    "./src/components/detailPage/Content.js",

    "./src/components/pomocno/LoadingCom.js",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        cyan: "hsl(180, 66%, 49%)",
        cyanLight: "hsl(180, 66%, 69%)",
        darkViolet: "hsl(257, 27%, 26%)",
        red: "hsl(0, 87%, 67%)",
        grayishViolet: "hsl(257, 7%, 63%)",
        veryDarkBlue: "hsl(255, 11%, 22%)",
        veryDarkViolet: "hsl(260, 8%, 14%) ",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Merriweather", "serif"],
        
      },
      spacing: {
        180: "32rem",
      },
      letterSpacing: {
        widest: "0.15em",
      },
    },
  },
  plugins: [],
};
