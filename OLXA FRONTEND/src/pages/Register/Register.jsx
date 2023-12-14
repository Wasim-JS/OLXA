import './Register.scss'
import Layout from '../../components/Layout/Layout'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAlert from '../../Custom Hooks/alert';



const Register = () => {
  const [registerData,setRegisterData]=useState({name:"",email:"",phone:"",password:"",secret:""})
  const [alertFun] = useAlert()

  const registerHandler = ({target}) =>{
    setRegisterData(prev=>({...prev,[target.name]:target.value}))
  }

  const handleRegisterController = async() =>{
    console.log(registerData)
    const {name,email,password,secret,phone} = registerData;
      
    if(
      [
        name,email,password,secret,phone
      ].some(field=> field==="")
    ){
       alertFun('error',"All fields are requried to Register")
      return
    }
     
    try {
      const register = await axios.post('/api/v1/auth/register',{name,email,password,secret,phone})
      const res = register.data;
      alertFun('success',res.message)
      
    } catch (error) {
      alertFun('error',error.response.data.message)
    }
    setRegisterData({name:"",email:"",password:"",secret:"",phone:""})

  }

  return (
    <Layout>
      
        <section className='reg-sec'>
          <form className='forms'>
            <h2>Register</h2>
          
          <TextField color='primary' value={registerData.name}  onChange={registerHandler}  name='name' id="standard-basic" label="Name" variant="standard" />
          <TextField color='primary' value={registerData.email} onChange={registerHandler}  name='email' id="standard-basic" label="Email" variant="standard" />
          <TextField color='primary' value={registerData.phone} onChange={registerHandler}  name='phone' id="standard-basic" label="Phone" variant="standard" />
          <TextField color='primary' value={registerData.password} onChange={registerHandler}  name="password" id="standard-basic" label="Password" variant="standard" />
          <TextField color='primary' value={registerData.secret} onChange={registerHandler} name='secret' id="standard-basic" label="In Wich City You Born?" variant="standard" />
           
          <Button className='reg-btn' sx={{color:"white"}} onClick={handleRegisterController} variant="contained" color='main'>Register</Button>


          </form>
          <p className='form-info'>Aready have an Account? click <Link to={'/login'}>Here</Link> to Login</p>
        </section>
    
      
    </Layout>
  )
}

export default Register;