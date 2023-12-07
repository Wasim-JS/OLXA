import './Login.scss'
import Layout from '../../components/Layout/Layout'
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

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

const Login = () => {
  return (
    <Layout>
       <ThemeProvider theme={theme}>
        <section className='login-sec'>
          <form className='forms'>
            <h2>Login</h2>
          
          <TextField color='primary' id="standard-basic" label="Email" variant="standard" />
          <TextField color='primary' id="standard-basic" label="Password" variant="standard" />
           
          <Button className='reg-btn' sx={{color:"white"}} onClick={()=>alert()} variant="contained" color='main'>Login</Button>


          </form>
          <p className='login-info'>Don&apos;t have an Account? click <Link to={'/register'}>Here</Link> to Register</p>
        </section>
        </ThemeProvider>
    </Layout>
  )
}

export default Login