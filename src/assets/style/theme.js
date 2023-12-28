import { createTheme } from "@mui/material/styles";

const baseTheme = {};
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#32a836",
      default: "#1a3353",
    },
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      main: "#009688",
    },
  },
  ...baseTheme,
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    // main: '#ccc',
    //default: '#ccc',
    //},
    text: {
      primary: "#fff",
    },
  },
  ...baseTheme,
});
