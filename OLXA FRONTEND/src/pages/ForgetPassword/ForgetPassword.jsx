import Layout from '../../components/Layout/Layout'
import './ForgetPassword.scss'

import 'react-toastify/dist/ReactToastify.css';

import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import useAlert from '../../Custom Hooks/alert';





const ForgetPassword = () => {

  const[forgetpassworddata,setForgetPasswordData]=useState({email:"",secret:"",newPassword:""})
  const [alertFun] = useAlert()
  const handleForgetPasswordHandler = async() =>{

    const{email,secret,newPassword}  = forgetpassworddata;
    if([email,secret,newPassword].some(field=>field ===""))
    {
     alertFun('error',"All fields are requried");
      return
    }

    try {
      const forgetPasswordApi = await axios.post('/api/v1/auth/forget-password',{email,secret,newPassword})
      const res = forgetPasswordApi.data;
      alertFun('success',res.message)
      
    } catch (error) {
      alertFun('error',error.response.data.message)
    }
    setForgetPasswordData({email:"",secret:"",newPassword:""})

  }
  return (
    <Layout>


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
     
     
    </Layout>
  )
}

export default ForgetPassword