import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import './SpeedDail.scss'
import { useNavigate } from 'react-router-dom';
import Notifications from '../Notifications/Notifications';
import { MdOutlineLogout } from "react-icons/md";
import { FaMagic } from "react-icons/fa";





const SpeedDail = () => {

  const navigate = useNavigate()
      
  return (
   
    <Box className="speedDail"  sx={{position: 'fixed',bottom: -30, right: 30,zIndex:99, height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
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
          icon={<img style={{width:"40px",height:"40px",objectFit:"contain",borderRadius:"50%"}} src={'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png'} alt='photo'/>}
          tooltipTitle={"Profile"}
          onClick={()=>navigate('/profile')}
        />
        <SpeedDialAction
          icon={<Notifications />}
          tooltipTitle={"Notification"}
          
        />

<SpeedDialAction
          icon={<MdOutlineLogout size={25} />}
          tooltipTitle={"Logout"}
          // onClick={()=>navigate('/profile')}
        />

    </SpeedDial>
  </Box>

  )
}

export default SpeedDail