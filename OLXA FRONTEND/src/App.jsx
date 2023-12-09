import { RouterProvider } from 'react-router-dom'
import {routes} from './pages/Routes'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
function App() {

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
