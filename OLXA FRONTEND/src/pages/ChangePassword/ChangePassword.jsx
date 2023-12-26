import { Button, TextField } from "@mui/material"
import Layout from "../../components/Layout/Layout"
import { MdOutlinePassword } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { useState } from "react";
import useAlert from "../../Custom Hooks/alert";
import axios from "axios";




const ChangePassword = () => {
    const [changePasswordData,setChangePasswordData] = useState({oldPassword:"",newPassword:""})
    const [alertFun] = useAlert();

    const handlePasswordChange = async () =>{
        const {oldPassword,newPassword} = changePasswordData
        if([oldPassword,newPassword].some(field=> field === ""))
        {
            return alertFun('error','All fields are requried')
        }


        try {
            const passwordChange = await axios.post("/api/v1/auth/change-password",changePasswordData);
            const res =  passwordChange.data;
            setChangePasswordData({oldPassword:"",newPassword:""})
            alertFun('success',res.message)
          } catch (error) {
            console.log('error while changing the password',error.response.data.message);
            alertFun('error',error.response.data.message)
          }
    }

  return (
    <Layout>
     
    <section className='login-sec'>
      <form className='forms'>
        <h2>Change Password <MdOutlinePassword /></h2>
      
      <TextField color='primary' value={changePasswordData.oldPassword} name="oldPassword"  id="standard-basic" onChange={({target})=>setChangePasswordData(prev=>({...prev,[target.name]:target.value}))} label="Enter your Old Password" variant="standard" />
      <TextField color='primary' value={changePasswordData.newPassword}  name="newPassword" id="standard-basic" onChange={({target})=>setChangePasswordData(prev=>({...prev,[target.name]:target.value}))} label="Enter your New Password" variant="standard" />
       
      <Button className='reg-btn' sx={{color:"white"}} onClick={handlePasswordChange} variant="contained" color='main'>Change Password <span style={{margin:"0px 5px"}}><FaExchangeAlt /></span></Button>


      </form>
    </section>

</Layout>
  )
}

export default ChangePassword