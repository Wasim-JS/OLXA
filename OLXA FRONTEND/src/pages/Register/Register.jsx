import './Register.scss'
import Layout from '../../components/Layout/Layout'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';



const Register = () => {
  const [registerData,setRegisterData]=useState({name:"",email:"",password:"",secret:""})

  const registerHandler = ({target}) =>{
    setRegisterData(prev=>({...prev,[target.name]:target.value}))
  }

  const handleRegisterController = async() =>{
    console.log(registerData)
    const {name,email,password,secret} = registerData;
      
    if(
      [
        name,email,password,secret
      ].some(field=> field==="")
    ){
      toast("All fields are requried");
      return
    }
     
    try {
      const register = await axios.post('/api/v1/auth/register',{name,email,password,secret})
      const res = register.data;
      toast(res.message);
      
    } catch (error) {
      toast(error.response.data.message);
    }
    setRegisterData({name:"",email:"",password:"",secret:""})

  }

  return (
    <Layout>
      
        <section className='reg-sec'>
          <form className='forms'>
            <h2>Register</h2>
          
          <TextField color='primary' value={registerData.name}  onChange={registerHandler}  name='name' id="standard-basic" label="Name" variant="standard" />
          <TextField color='primary' value={registerData.email} onChange={registerHandler}  name='email' id="standard-basic" label="Email" variant="standard" />
          <TextField color='primary' value={registerData.password} onChange={registerHandler}  name="password" id="standard-basic" label="Password" variant="standard" />
          <TextField color='primary' value={registerData.secret} onChange={registerHandler} name='secret' id="standard-basic" label="In Wich City You Born?" variant="standard" />
           
          <Button className='reg-btn' sx={{color:"white"}} onClick={handleRegisterController} variant="contained" color='main'>Register</Button>


          </form>
          <p className='form-info'>Aready have an Account? click <Link to={'/login'}>Here</Link> to Login</p>
        </section>
        <ToastContainer />
      
    </Layout>
  )
}

export default Register;