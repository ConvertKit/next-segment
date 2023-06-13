/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    // Sidenote, we add templates here because these are the...templates...that we use for building out repeatable pages.
    "./src/templates/**/*.{js,ts,jsx,tsx}",
    "./out/**/*.{html,js}",
  ],
  important: false,
  separator: ":",
  theme: {
    colors: {
      // Any time you add a new color that you want to use as a CSS var, make sure to update :root in __base_dir.scss to include the CSS var.
      // Also note that these values MUST be RGB values in order to utilize Tailwind's opacity CSS var.
      transparent: "transparent",
      white: { DEFAULT: "#FFFFFF", 100: "#FAFAFA" },
      inherit: "inherit",
      gray: {
        50: "#F6F8FA",
        100: "#EDF2F4",
        200: "#DDE2E7",
        300: "#CFD4D9",
        400: "#C0C5CB",
        500: "#B0B7BE",
        600: "#8D9298",
        700: "#6A6E72",
        800: "#373F45",
        900: "#252B30",
      },
      black: { DEFAULT: "#212F4F", "06": "rgba(33,47,79,0.6)", 100: "#000000" },
      red: {
        50: "#FFEFF0",
        100: "#FEDFE1",
        200: "#FDBFC3",
        300: "#FDA0A4",
        400: "#FC8086",
        500: "#FB6068",
        600: "#D3434A",
        700: "#AA3137",
        800: "#8B2329",
        900: "#621E22",
      },
      yellow: {
        50: "#FDF8F1",
        100: "#FBF1E3",
        200: "#F7E3C6",
        300: "#F4D4AA",
        400: "#F0C68D",
        500: "#ECB871",
        600: "#D19646",
        700: "#A6712C",
        800: "#725122",
        900: "#473215",
      },
      green: {
        50: "#ECF6F2",
        100: "#D8EDE6",
        200: "#B2DACC",
        300: "#8BC8B3",
        400: "#65B599",
        500: "#3EA380",
        600: "#328266",
        700: "#26644F",
        800: "#1C4A3A",
        900: "#123126",
      },
      blue: {
        50: "#EDEFF5",
        100: "#DAE0EB",
        200: "#B6C1D7",
        300: "#91A1C4",
        400: "#6D82B0",
        500: "#48639C",
        600: "#324C85",
        700: "#263963",
        800: "#212F4F",
        900: "#1D283E",
        fade: "hsla(221, 37%, 45%, 0.25)",
      },
      twitter: "hsla(206, 82%, 63%, 1)",
      facebook: "hsla(221, 44%, 41%, 1)",
      linkedin: "hsla(199, 100%, 35%, 1)",
      instagram: "hsla(350, 96%, 60%, 1)",
      pinterest: "hsla(353, 92%, 39%, 1)",
      youtube: "hsla(0, 100%, 50%, 1)",
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      borderRadius: {
        cta: "1.1111111111111112rem 0",
        // brand has rounded corners except the top left
        brand: "0 .75rem .75rem",
      },
      rotate: {
        9: "9deg",
        18: "18deg",
      },

      borderWidth: {
        1: "1px",
        5: "5px",
      },
      cursor: {
        help: "help",
      },
      inset: {
        "1/2": "50%",
        full: "100%",
      },
      scale: {
        "-flip": "-100%",
      },
      spacing: {
        0.5: "0.125rem",
        1.5: "0.375rem",
        2.5: "0.625rem",
        3.5: "0.875rem",
        4.5: "1.125rem",
        "1/2": "50%",
      },
      zIndex: {
        "-1": "-1",
        100: "100",
        9999: "9999",
        99999: "99999",
      },
    },
    fontFamily: {
      sans: "var(--font-primary)",
      primary: "var(--font-primary)",
      secondary: "var(--font-secondary)",
      serif: "var(--font-secondary)",
      mono: "var(--font-mono)",
      grayscale: "var(--font-grayscale)",
    },
    fontSize: {
      2.5: "var(--size-2_5)",
      3: "var(--size-3)",
      3.5: "var(--size-3_5)",
      4: "var(--size-4)",
      4.5: "var(--size-4_5)",
      5: "var(--size-5)",
      6: "var(--size-6)",
      7: "var(--size-7)",
      8: "var(--size-8)",
      9: "var(--size-9)",
      10: "var(--size-10)",
      11: "var(--size-11)",
      12: "var(--size-12)",
      14: "var(--size-14)",
    },
    textColor: (theme) => theme("colors"),
    backgroundColor: (theme) => theme("colors"),
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
    }),
    boxShadow: {
      none: "none",
      DEFAULT: "0px 2px 7px rgba(0, 0, 0, 0.15)",
      soft: "0px 3px 3px hsl(var(--shadow-color) / 0.03), 0px 6px 6px hsl(var(--shadow-color) / 0.07), 0px 12px 12px hsl(var(--shadow-color) / 0.07)",
      sm: "0px 3px 12px rgba(33, 47, 79, 0.1)",
      lg: "0 2px 9px 0 rgba(210, 214, 220, 0.45)",
      xl: "0px 24px 34px rgba(0, 0, 0, 0.05), 0px 6px 14px rgba(0, 0, 0, 0.025)",
      "2xl": "0 20px 20px 0 var(--box-shadow-hsl)",
      "3xl": "0 32px 32px var(--box-shadow-hsl)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
      custom:
        "var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur-radius) var(--box-shadow-spread-radius) var(--box-shadow-hsl)",
    },
    fill: (theme) => ({
      ...theme("colors"),
      current: "currentColor",
    }),
    stroke: (theme) => ({
      ...theme("colors"),
      current: "currentColor",
    }),
  },

  variants: {
    alignContent: ["responsive"],
    alignItems: ["responsive"],
    alignSelf: ["responsive"],
    appearance: ["responsive"],
    backgroundAttachment: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
    borderColor: ["hover", "focus", "group-hover"],
    borderRadius: ["responsive"],
    borderWidth: ["responsive", "hover"],
    boxShadow: ["hover", "focus"],
    cursor: ["responsive"],
    display: ["responsive"],
    flexDirection: ["responsive"],
    flexWrap: ["responsive"],
    flex: ["responsive"],
    flexGrow: ["responsive"],
    flexShrink: ["responsive"],
    float: ["responsive"],
    fontSize: ["responsive"],
    fontWeight: ["responsive"],
    gap: ["responsive"],
    height: ["responsive"],
    inset: ["responsive"],
    justifyContent: ["responsive"],
    margin: ["responsive"],
    maxHeight: ["responsive"],
    maxWidth: ["responsive"],
    minHeight: ["responsive"],
    minWidth: ["responsive"],
    opacity: ["hover", "group-hover", "focus", "responsive"],
    order: ["responsive"],
    outline: ["responsive", "focus"],
    overflow: ["responsive"],
    padding: ["responsive"],
    position: ["responsive"],
    inset: ["responsive"],
    boxShadow: ["hover", "focus", "responsive"],
    rotate: ["responsive", "hover"],
    textAlign: ["responsive"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
    textDecoration: ["hover", "focus", "group-hover"],
    textTransform: ["responsive"],
    width: ["responsive"],
    wordBreak: ["responsive"],
    zIndex: ["focus", "responsive"],
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    // Add .highlight and .highlight-color as a utility using our colors theme
    // Note there are nested colors in the theme
    function ({ addUtilities, theme }) {
      const highlightUtilities = Object.entries(theme("colors")).map(
        ([key, value]) => {
          if (typeof value === "object") {
            return Object.entries(value).map(([color, hex]) => {
              return {
                [`.highlight-${key}-${color}`]: {
                  "--highlight-color": hex,
                },
              }
            })
          } else {
            return {
              [`.highlight-${key}`]: {
                "--highlight-color": value,
              },
            }
          }
        }
      )
      addUtilities(highlightUtilities)
    },
  ],
}
