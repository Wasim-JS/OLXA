import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
import './ShowBid.scss'

import { useState } from 'react';
import { Box } from '@mui/material';
import useAlert from '../../Custom Hooks/alert';
import axios from 'axios';
const ShowBid = ({children,productId,fetchProduct}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [bid,setBid]= useState({bidPrice:"",bidDesc:""})
    const [alertFun] = useAlert()

    const submitBithandler = async () =>{
      const {bidPrice,bidDesc} = bid;
      if([bidPrice,bidDesc].some(field=>field===""))
      {
        alertFun('error','All Fields are requried')
        return
      }

      let bidder = {
        bidPrice:bid.bidPrice,
        bidDesc:bid.bidDesc,
        productId

      }
 
      try {
        const reletedProducts = await axios.post(`/api/v1/product/bid`,bidder);
        let res =  reletedProducts.data.message;
        alertFun('success',res)
        fetchProduct(productId)
        setBid({bidPrice:"",bidDesc:""})
        setOpen(false)
      } catch (error) {
        console.log(error);
        alertFun('error','error while raising a Bid')
      }

      
    }

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

            <button type='button' onClick={submitBithandler} className='sub-bid-btn'>Submit Your Bid</button>
        </form>
      </Box>
    </Modal>
  </div>
  )
}

export default ShowBid