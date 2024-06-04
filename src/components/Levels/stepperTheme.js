import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#e0e0e0", // Default color
          "&.Mui-active": {
            color: "#d31017", // Active color
            zIndex: 2, // Increase zIndex to bring the circle in front of the line
          },
          "&.Mui-completed": {
            color: "#e0e0e0", // Completed color
          },
          fontSize: 55, // circle size
        },
        text: {
          fill: "#ffffff", // Circle font color
          fontSize: 12, // Circle font size
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: "#e0e0e0", // Default title color
          "&.Mui-active": {
            color: "#d31017", // Active title color
          },
          "&.Mui-completed": {
            color: "#e0e0e0", // Completed title color
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        //dashed line param
        line: {
          borderColor: "#e0e0e0",
          borderTopStyle: "dashed",
          borderTopWidth: 2,
          marginTop: 15,
        },
      },
    },
  },
});

export default theme;
