import {Outlet , Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
const IsLogin = () => {
     const {isLoggedIn} = useSelector(state=>state.user)
  
       return(
          isLoggedIn?<Outlet /> :<Navigate to={'/login'} />
       );
}

export default IsLogin