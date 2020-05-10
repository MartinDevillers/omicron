// Tailwind: https://github.com/system-ui/theme-ui/blob/e5e68cdb64db5ce763f86f51311dbaa04780745d/packages/preset-tailwind/src/index.ts
// Theme: https://github.com/LekoArts/gatsby-themes/blob/67a05ac3e1deaddfe38591739e7f50f56d49d109/themes/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index.js

import baseTheme from "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui"

export default {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    toolbar: "#d2c7ec",
    chart: "#fff",
    complexities: {
      bad: "#f8a6a9",
      poor: "#ffd0ae",
      fair: "#fffad2",
      good: "#d4e0b1",
      excellent: "#a5c796",
    },
    modes: {
      dark: {
        ...baseTheme.colors?.modes?.dark,
        toolbar: "#4b3187",
        chart: "#2d3748", // '#2d3748', 011627
        complexities: {
          bad: "#8d5e60",
          poor: "#ba8d7a",
          fair: "#dfc29b",
          good: "#878a5a",
          excellent: "#2e552d",
        },
      },
    },
  },
  links: {
    arrow: {
      padding: 2,
      margin: -2,
      opacity: 0.65,
      transition: "opacity 0.3s ease-in-out",
      "&:hover, &:focus": { opacity: 1 },
    },
  },
  icons: {
    arrow: {
      width: 4,
      height: 4,
      marginTop: "0.25rem",
      borderRightWidth: "0.25rem",
      borderRightStyle: "solid",
      borderTopWidth: "0.25rem",
      borderTopStyle: "solid",
      borderColor: "toggleIcon",
    },
    dot: {
      width: 2,
      height: 2,
      marginY: 2,
      marginX: 1,
      backgroundColor: "toggleIcon",
      borderRadius: "50%",
      opacity: 0.65,
    },
  },
}
