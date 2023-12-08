import './Login.scss'
import Layout from '../../components/Layout/Layout'
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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

  const[loginData,setLoginData]=useState({email:"",password:""})

  const handleLoginSubmit = async() =>{
       
    const{email,password}  = loginData;

    try {
      const login = await axios.post('/api/v1/auth/login',{email,password})
      const res = login.data;
      toast(res.message);
      
    } catch (error) {
      toast(error.response.data.message);
    }
    setLoginData({email:"",password:""})

    

  }
  return (
    <Layout>
       <ThemeProvider theme={theme}>
        <section className='login-sec'>
          <form className='forms'>
            <h2>Login</h2>
          
          <TextField color='primary' value={loginData.email} onChange={(e)=>setLoginData(prev=>({...prev,email:e.target.value}))} id="standard-basic" label="Email" variant="standard" />
          <TextField color='primary' value={loginData.password} onChange={(e)=>setLoginData(prev=>({...prev,password:e.target.value}))} id="standard-basic" label="Password" variant="standard" />
           
          <Button className='reg-btn' sx={{color:"white"}} onClick={handleLoginSubmit} variant="contained" color='main'>Login</Button>


          </form>
          <p className='login-info'><Link to={'/forget-password'}>forget password?</Link></p>
          <p className='login-info'>Don&apos;t have an Account? click <Link to={'/register'}>Here</Link> to Register</p>
        </section>
        <ToastContainer />
        </ThemeProvider>
    </Layout>
  )
}

export default Login