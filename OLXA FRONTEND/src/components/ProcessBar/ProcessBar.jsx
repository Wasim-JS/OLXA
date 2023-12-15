import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FaGripLinesVertical } from "react-icons/fa";


export default function ProcessBar({approved}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={approved?2:1} 
      orientation="vertical" connector={<FaGripLinesVertical color='skyblue' />}
      >
     
          <Step >
            <StepLabel>Sold</StepLabel>
          </Step>
          
          <Step >
            <StepLabel>Approved</StepLabel>
          </Step>
      
      </Stepper>
    </Box>
  );
}