import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./stepperTheme";

const Levels = ({ levelNames = [], quizLevel = 0 }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizStep = levelNames.map((level) => ({
      title: level.toUpperCase(),
    }));
    setLevels(quizStep);
  }, [levelNames]);

  //material UI stepper
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Stepper activeStep={quizLevel} alternativeLabel>
          {levels.map((level, index) => (
            <Step key={index}>
              <StepLabel>{level.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </ThemeProvider>
  );
};

export default React.memo(Levels);
