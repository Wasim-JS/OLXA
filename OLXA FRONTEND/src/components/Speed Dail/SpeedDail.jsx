import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import './SpeedDail.scss'
import { useNavigate } from 'react-router-dom';
import Notifications from '../Notifications/Notifications';
import { MdOutlineLogout } from "react-icons/md";
import { FaMagic } from "react-icons/fa";
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {updateUserDataOnLogout} from '../../../src/redux-store/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAlert from '../../Custom Hooks/alert';
import { PiPasswordBold } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";




const SpeedDail = () => {
  
  const {user} = useSelector(state=>state.user)
  console.log("full user ",useSelector(state=>state.user));

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [alertFun] = useAlert()

  const logoutFromApp = async() =>{
    try {
      const logout = await axios.get('/api/v1/auth/logout')
      const res = logout.data;
      console.log(res.message)
      alertFun('success',res.message)
      navigate('/')
      dispatch(updateUserDataOnLogout())
      
    } catch (error) {
     console.log(error)
      toast(error.response.data.message);
    }
  }
      
  return (
   <>
    <Box className="speedDail"  sx={{position: 'fixed',bottom: 40, right: 30,zIndex:9999999999, height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ bottom: 0, right: 0 }}
      className='speedDail'
      color='main'
      icon={
     <FaMagic size={25} />
      }
    >
      
        <SpeedDialAction
          icon={<img style={{width:"40px",height:"40px",objectFit:"cover",borderRadius:"50%"}} src={user?.avatar[0]?.cloudLink || 'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png'} alt='photo'/>}
          tooltipTitle={"Profile"}
          onClick={()=>navigate('/profile')}
        />

{
          user?.role !== 'admin' && <SpeedDialAction
          icon={<Notifications />}
          tooltipTitle={"Notification"}
          
        />
        }
      

<SpeedDialAction
          icon={<PiPasswordBold size={25} />}
          tooltipTitle={"Change Password"}
          onClick={()=>navigate('/changePassword')}
          />
        
        {
          user?.role === 'admin' && <SpeedDialAction
          icon={<RiAdminFill size={25} />}
          tooltipTitle={"Admin Dashboard"}
          onClick={()=>navigate('/admin')}
          
        />
        }


<SpeedDialAction
          icon={<MdOutlineLogout size={25} />}
          tooltipTitle={"Logout"}
          onClick={logoutFromApp}
        />


    </SpeedDial>
  </Box>
    <ToastContainer />
    </>

  )
}

export default SpeedDail