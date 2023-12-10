import { RouterProvider } from 'react-router-dom'
import {routes} from './pages/Routes'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUserDataOnLogin } from './redux-store/userSlice';

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const token = Cookies.get('token');

    if(token){
         sendToken()
    }
  },[])

  async function sendToken ()
  {
    try {
      const login = await axios.get('/api/v1/auth/me')
      dispatch(updateUserDataOnLogin(login.data.user))
      
    } catch (error) {
     console.log(error)
    }
  }

  const theme = createTheme({
    palette: {
      primary:{
        main: "#87CEEB",
  
      },
      main:{
        main: "#D53A3A",
      }
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
     
        <RouterProvider router={routes} />
  
        </ThemeProvider>
 
    </>
  )
}

export default App
