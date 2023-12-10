import {Outlet , Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
const IsLogout = () => {
    
    const {isLoggedIn} = useSelector(state=>state.user)
    
    console.log(isLoggedIn)
    return(
        !isLoggedIn?<Outlet /> :<Navigate to={'/'} />
    );
}

export default IsLogout