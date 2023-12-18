import './Login.scss'
import Layout from '../../components/Layout/Layout'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { updateUserDataOnLogin } from '../../redux-store/userSlice';
import useAlert from '../../Custom Hooks/alert';
import { relatedCityProducts } from '../../utiles/FetchReletedRecords';
import { addProducts } from '../../redux-store/productsSlice';
const Login = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [alertFun] = useAlert()

  const[loginData,setLoginData]=useState({email:"",password:""})

  const handleLoginSubmit = async() =>{
   
       
    const{email,password}  = loginData;

    if([email,password].some(field => field === "")) return alertFun('error',"All fields are requried to login");

    try {
      const login = await axios.post('/api/v1/auth/login',{email,password})
      const res = login.data;
      dispatch(updateUserDataOnLogin(res.user))
      alertFun('success',res.message)
      navigate('/home2')
      
      
      relatedCityProducts().then(data => dispatch(addProducts(data.products)))
      .catch(error=>console.log(error))
      
    } catch (error) {
     console.log(error)
      alertFun('error',error.response.data.message)
    }
    setLoginData({email:"",password:""})

    

  }
  return (
    <Layout>
     
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
   
    </Layout>
  )
}

export default Login