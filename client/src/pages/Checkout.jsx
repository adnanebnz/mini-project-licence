import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, TextField, Checkbox, FormControlLabel} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const steps = ["Remplir vos Informations", "Payer"];
const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container>
      <Box sx={{ width: "100%", marginTop: "2rem", marginBottom: "2rem" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <form className="mt-8 flex gap-3 flex-col">
          <div className="flex gap-5 items-center justify-center">
            <TextField
              fullwidth
              id="outlined-basic"
              label="Nom"
              variant="outlined"
              sx={{ width: "50%" }}
            />
            <TextField
              fullwidth
              id="outlined-basic"
              label="Prenom"
              variant="outlined"
              sx={{ width: "50%" }}
            />
          </div>
          <div className="flex gap-5 items-center justify-center">
            <TextField
              fullwidth
              id="outlined-basic"
              label="Adresse 1"
              variant="outlined"
              sx={{ width: "50%" }}
            />
            <TextField
              fullwidth
              id="outlined-basic"
              label="Adresse 2"
              variant="outlined"
              sx={{ width: "50%" }}
            />
          </div>
          <div className="flex gap-5 items-center justify-center">
            <TextField
              id="outlined-basic"
              label="Ville"
              variant="outlined"
              sx={{ width: "50%" }}
            />
            <TextField
              inputProps={{ inputMode: "numeric" }}
              id="outlined-basic"
              label="Code postale"
              variant="outlined"
              sx={{ width: "50%" }}
            />
          </div>
          <div className="flex gap-5 items-center justify-center">
          <TextField
              id="outlined-basic"
              label="Numero de carte"
              variant="outlined"
              sx={{ width: "50%" }}
            />
            <TextField
              inputProps={{ inputMode: "numeric" }}
              id="outlined-basic"
              label="Date Expiration"
              variant="outlined"
              sx={{ width: "50%" }}
            />
            <TextField
              inputProps={{ inputMode: "numeric" }}
              id="outlined-basic"
              label="Cvv"
              variant="outlined"
              sx={{ width: "50%" }}
            />
          </div>
          <Box display="flex" alignItems="center" gap="0.5rem">
            <Typography>Payer avec:</Typography>
          <RadioGroup
          row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="cib" control={<Radio />} label="CIB" />
        <FormControlLabel value="eddahabia" control={<Radio />} label="Eddahabia" />
      </RadioGroup>
          </Box>
          <div className="mt-2">
            <Typography variant="h1" fontSize="18px" >Total: 4000 DZD</Typography>
          </div>
          <div className="flex items-center justify-end mt-4">
            <Button variant="contained"> Confirmer</Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default Checkout;
