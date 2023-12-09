import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './Modal.scss'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:400,
    bgcolor: 'background.paper',
    border: '2px solid skyblue',
    boxShadow: 24,
    p: 4,
  };
  
  


const Modals = ({children}) => {
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <div>
    <Button onClick={handleOpen}>{children}</Button>
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box  className="mod">
        <Typography style={{textAlign:'center',fontWeight:700}} id="keep-mounted-modal-title" variant="h6" component="h2">
           Notifications
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          No New Notifications
        </Typography>
      </Box>
    </Modal>
  </div>
    
  )
}

export default Modals