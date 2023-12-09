import { useState } from 'react'
import {Outlet , Navigate} from 'react-router-dom'
const IsLogout = () => {
    
    const [isLogout,setIsLogout]=useState(true)
  
    return(
         isLogout?<Outlet /> :<Navigate to={'/'} />
    );
}

export default IsLogout