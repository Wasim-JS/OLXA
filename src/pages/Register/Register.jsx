import './Register.scss'
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

const Register = () => {
  return (
    <Layout>
       <ThemeProvider theme={theme}>
        <section className='reg-sec'>
          <form className='forms'>
            <h2>Register</h2>
          
          <TextField color='primary' name='name' id="standard-basic" label="Name" variant="standard" />
          <TextField color='primary' id="standard-basic" label="Email" variant="standard" />
          <TextField color='primary' id="standard-basic" label="Password" variant="standard" />
          <TextField color='primary' id="standard-basic" label="In Wich City You Born?" variant="standard" />
           
          <Button className='reg-btn' sx={{color:"white"}} onClick={()=>alert()} variant="contained" color='main'>Register</Button>


          </form>
          <p className='form-info'>Aready have an Account? click <Link to={'/login'}>Here</Link> to Login</p>
        </section>
        </ThemeProvider>
    </Layout>
  )
}

export default Register