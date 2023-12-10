import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './Modal.scss'
import PropTypes from 'prop-types';


const Modals = ({children}) => {
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <div>
    <div onClick={handleOpen}>{children}</div>
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

Modals.propTypes = {
  children: PropTypes.node.isRequired, // 'node' allows any React node (element, string, number, etc.)
};

export default Modals