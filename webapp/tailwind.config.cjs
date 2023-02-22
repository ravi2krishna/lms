/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    // themes: [
    //   {
    //     light: {
    //       // eslint-disable-next-line @typescript-eslint/no-var-requires
    //       ...require("daisyui/src/colors/themes")["[data-theme=corporate]"],
    //       primary: "#F4B400",
    //       "primary-focus": "#ffc31a",
    //     },
    //   },
    // ],
  },
};
