import Layout from '../../components/Layout/Layout'
import './ForgetPassword.scss'
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


const ForgetPassword = () => {

  const[forgetpassworddata,setForgetPasswordData]=useState({email:"",secret:"",newPassword:""})

  const handleForgetPasswordHandler = async() =>{

    const{email,secret,newPassword}  = forgetpassworddata;
    if([email,secret,newPassword].some(field=>field ===""))
    {
      toast("All fields are requried");
      return
    }

    try {
      const forgetPasswordApi = await axios.post('/api/v1/auth/forget-password',{email,secret,newPassword})
      const res = forgetPasswordApi.data;
      toast(res.message);
      
    } catch (error) {
      toast(error.response.data.message);
    }
    setForgetPasswordData({email:"",secret:"",newPassword:""})

  }
  return (
    <Layout>

<ThemeProvider theme={theme}>
        <section className='login-sec'>
          <form className='forms'>
            <h2>Forget Password?</h2>
          
          <TextField color='primary' value={forgetpassworddata.email} onChange={(e)=>setForgetPasswordData(prev=>({...prev,email:e.target.value}))} name='email' id="standard-basic" label="Email" variant="standard" />
          <TextField color='primary' value={forgetpassworddata.secret} onChange={(e)=>setForgetPasswordData(prev=>({...prev,secret:e.target.value}))} name='secret' id="standard-basic" label="In Which City you Born?" variant="standard" />
          <TextField color='primary' value={forgetpassworddata.newPassword} onChange={(e)=>setForgetPasswordData(prev=>({...prev,newPassword:e.target.value}))} name='newPassword' id="standard-basic" label="New Password" variant="standard" />
           
          <Button className='reg-btn' sx={{color:"white"}} onClick={handleForgetPasswordHandler} variant="contained" color='main'>Reset Password</Button>


          </form>
          <p className='login-info'>Click <Link to={'/login'}>Here</Link> to Login</p>
        </section>
        </ThemeProvider>
        <ToastContainer />
    </Layout>
  )
}

export default ForgetPassword