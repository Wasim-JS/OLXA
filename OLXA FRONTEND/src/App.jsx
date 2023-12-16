import { RouterProvider } from 'react-router-dom'
import {routes} from './pages/Routes'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { updateUserDataOnLogin } from './redux-store/userSlice';
import {sendToken} from './utiles/userFetch'
import { relatedCityProducts } from './utiles/FetchReletedRecords';
import { addProducts } from './redux-store/productsSlice';
function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const token = Cookies.get('token');

    relatedCityProducts().then(data => dispatch(addProducts(data.products)))
    .catch(error=>console.log(error))
    if(token){
      sendToken().then(data=>{
        dispatch(updateUserDataOnLogin(data))

      }).catch(error=>console.log(error))
    }
  },[])


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
