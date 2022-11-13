import { createTheme } from "@mui/material";
import { purple, teal } from "@mui/material/colors";

const theme = createTheme({
  //here you set palette, typography ect...

  palette: {
    mode: "dark",
    primary: teal,
    secondary: purple,
  },
});

export default theme;
