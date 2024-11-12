//custom utiity 정의
const colors = require("./src/utils/colors.js");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/index.css"],
  theme: {
    extend: {
      fontSize: {
        "vw-1": "1vw",
        "vw-2": "2vw",
      },
      colors: {
        primary: {
          default: colors.PRIMARY.DEFAULT,
          light: colors.PRIMARY.LiGHT,
        },
        customColor: "#C5B5F7",
        customColor2: "#F3F5FF",
        customColor3: "#2519B2",
        submitColor: "#2519B2",
        black1: "#343849",
        purple: "#ddd6fe",
        btncolor: "#4D39E9",
        customGradient: {
          start: "#918FFF", // 0% 위치의 색상
          midStart: "#5956FF", // 45% 위치의 색상
          midEnd: "#3F3CFF", // 55% 위치의 색상
          endStart: "#3431FF", // 79% 위치의 색상
          end: "#0011FF", // 100% 위치의 색상
        },
        customGradient2: "linear-gradient(to right, #86fde8, #acb6e5)",
        purple2: "#C5B5F7",
      },
      opacity: {
        20: "0.2",
      },
      gridTemplateColumns: {
        "3by5": "3fr 5fr",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/aspect-ratio")],
};
