import { extendTheme } from "@chakra-ui/react";

// Editorial recipe-site look: warm paper background, near-black ink,
// a deep terracotta accent, serif display type over a quiet sans.
const theme = extendTheme({
  fonts: {
    heading: `'Fraunces', Georgia, serif`,
    body: `'Inter', -apple-system, 'Segoe UI', sans-serif`,
  },
  colors: {
    paper: {
      50: "#FDFCFA",
      100: "#FAF7F2",
      200: "#F3EFE7",
      300: "#E7E2D6",
    },
    ink: {
      500: "#6B6A64",
      700: "#3D3C38",
      900: "#22211E",
    },
    accent: {
      50: "#FAEDE8",
      500: "#9C3B22",
      600: "#84301B",
      700: "#6D2715",
    },
  },
  styles: {
    global: {
      body: {
        bg: "paper.100",
        color: "ink.900",
      },
    },
  },
  components: {
    Button: {
      baseStyle: { borderRadius: "full", fontWeight: 600 },
      variants: {
        primary: {
          bg: "ink.900",
          color: "white",
          _hover: { bg: "ink.700" },
          _active: { bg: "ink.700" },
        },
        accent: {
          bg: "accent.500",
          color: "white",
          _hover: { bg: "accent.600" },
          _active: { bg: "accent.700" },
        },
        quiet: {
          bg: "paper.200",
          color: "ink.900",
          _hover: { bg: "paper.300" },
        },
      },
      defaultProps: { variant: "primary" },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "white",
            borderColor: "paper.300",
            borderRadius: "full",
            _hover: { borderColor: "ink.500" },
            _focusVisible: {
              borderColor: "accent.500",
              boxShadow: "0 0 0 1px #9C3B22",
            },
          },
        },
      },
    },
  },
});

export default theme;
