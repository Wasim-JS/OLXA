
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './Stepper.scss'


const StepperCom = ({done=0}) => {
    const steps = ['Describe Your Product', 'Uplaod Images', 'Sell'];

  return (
    <Box className={'stepper'} sx={{ width: '100%',zIndex:10 }}>
    <Stepper activeStep={done}>
      {steps.map((label) => {
        const stepProps = {};
        const labelProps = {};
       
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  </Box>
  )
}

export default StepperCom