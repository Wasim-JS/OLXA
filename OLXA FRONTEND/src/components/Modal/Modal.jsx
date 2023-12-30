import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import './Modal.scss'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAlert from '../../Custom Hooks/alert'
import { sendToken } from '../../utiles/userFetch';
import {useDispatch} from 'react-redux'
import { updateUserDataOnLogin } from '../../redux-store/userSlice';
import { clearAllNotifications } from '../../utiles/FetchReletedRecords';



const Modals = ({children}) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [alertFun] = useAlert()







  

  const handelClearNotifications = async() =>{
    try {
      clearAllNotifications(2).then(data=>{

        sendToken().then(data=>{
          dispatch(updateUserDataOnLogin(data))
  
        }).catch(error=>console.log(error))
        alertFun('success',data.message)
        
      })
     
    } catch (error) {
      console.log(error);
      alertFun('error while clearing notifications ',error.message)
    }
  }

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
        <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>

          <div className='clear-noti-btn'>
            <button onClick={handelClearNotifications} style={{backgroundColor:`${user?.notifications?.length>0?"red":"gray"}`}} disabled={user?.notifications?.length===0} >Clear All</button>
          </div>
          
          {
            user?.notifications?.length>0?(
              user?.notifications.map(noti=>(

                <div key={noti._id} className='show-noti'>
                   <p>{noti.notificationDesc}</p>
                   {
                    noti?.gotoProduct!=="" && <p className='view-link'><Link to={`/product/${noti?.gotoProduct}`}>View Product</Link></p>
                   }
                </div>
           ))
            ):(
              <div>
                No New Notifications
              </div>
            )
            
          }
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