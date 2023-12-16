import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
import './ShowBid.scss'

import { useState } from 'react';
import { Box } from '@mui/material';
const ShowBid = ({children,productId}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log("product id is ",productId);
    const [bid,setBid]= useState({bidPrice:"",bidDesc:""})

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div  onClick={handleOpen}>{children}</div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{display:"flex",justifyContent:"center",alignItems:"center"}}
    >
      <Box sx={{width:"75%",height:"75%",backdropFilter:"blur(30px)"}}>
        <div >
            <button id='clbtn' onClick={()=>setOpen(false)}><IoClose size={26}/></button>

        </div>

        <form className='bidForm' >
        <h3>Make A Bid</h3>
            <input value={bid.bidPrice} onChange={({target})=>setBid(prev=>({...prev,bidPrice:target.value}))} type="text" placeholder='Enter your Bid Rate Here...'/>
            <textarea value={bid.bidDesc} onChange={({target})=>setBid(prev=>({...prev,bidDesc:target.value}))} placeholder='Enter your Bit Description Here.....' name="" id="" cols="30" rows="10"></textarea>

            <button type='button' onClick={()=>console.log(bid)} className='sub-bid-btn'>Submit Your Bid</button>
        </form>
      </Box>
    </Modal>
  </div>
  )
}

export default ShowBid