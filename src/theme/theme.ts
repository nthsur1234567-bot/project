import { createTheme } from "@mui/material/styles"; // comment: MUI theme creator

const theme = createTheme({ // comment: create global theme
  direction: "rtl", // comment: Hebrew support (optional but nice)
  typography: { // comment: global typography settings
    fontFamily: ["Arial", "sans-serif"].join(","), // comment: consistent font
    h4: { fontWeight: 700 }, // comment: consistent page title weight
    h6: { fontWeight: 600 }, // comment: app bar title weight
  }, // comment: end typography
  shape: { borderRadius: 12 }, // comment: consistent roundness
}); // comment: end theme

export default theme; // comment: export theme
