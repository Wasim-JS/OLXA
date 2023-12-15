import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './ShowImageModal.scss'
import { IoClose } from "react-icons/io5";
import { useSelector,useDispatch } from 'react-redux';
import { closeImage } from '../../redux-store/ShowImageSlice';

const ShowImageModol = () => {
    const dispatch = useDispatch()

    const {imageUrl,show} = useSelector(state=> state.image)


  return (
      <div>
      
      <Modal
      sx={{display:"flex",justifyContent:"center",alignItems:"center"}}
        open={show}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modelImage'
      >
        <Box  className="box">
           <div className='btn' onClick={()=>dispatch(closeImage())}><IoClose size={30} color='white'/></div>
          <img  src={imageUrl} alt="" />
        </Box>
      </Modal>
    </div>
  )
}

export default ShowImageModol