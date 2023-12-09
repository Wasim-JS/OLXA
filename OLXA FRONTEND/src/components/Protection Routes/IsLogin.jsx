import { useState } from 'react'
import {Outlet , Navigate} from 'react-router-dom'
const IsLogin = () => {
    const [isLogin,setIsLogin]=useState(true)
  
       return(
            isLogin?<Outlet /> :<Navigate to={'/login'} />
       );
}

export default IsLogin