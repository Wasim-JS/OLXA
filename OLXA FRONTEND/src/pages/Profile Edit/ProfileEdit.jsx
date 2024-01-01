import { Button, TextField } from "@mui/material"
import Layout from "../../components/Layout/Layout"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import useAlert from "../../Custom Hooks/alert"
import { sendToken } from "../../utiles/userFetch"
import {useDispatch} from 'react-redux'
import { updateUserDataOnLogin } from "../../redux-store/userSlice"
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";




const ProfileEdit = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector(state=>state.user)
    const [editData,setEditData] = useState({name:"",email:"",phone:"",country:"",state:"",city:""})
    const [alertFun] = useAlert();

    useEffect(()=>{

        setEditData(prev=>({...prev,name:user?.name,email:user?.email,phone:user.phone,country:user?.country,state:user?.state,city:user?.city}))

    },[])

    const handleEditProfile = async()=>{

        console.log("edi data ",editData);
        
        try {
            const editProfileData = await axios.patch(`/api/v1/auth/edit-profile`,editData);
            const res =  editProfileData.data;
            alertFun('success',res.message)
            sendToken().then(data=>{
                dispatch(updateUserDataOnLogin(data))
                navigate('/profile')
        
              }).catch(error=>console.log(error))
        } catch (error) {
            console.log(error);
            alertFun('error',"something went wrong while updating")
       
          }

    }


  return (
    <Layout>
      
    <section className='reg-sec'>
      <form className='forms'>
        <h2 style={{textDecoration:"underline"}}>Edit Profile</h2>
      
      <TextField color='primary' value={editData?.name}    name='name'  onChange={({target})=>setEditData(prev=>({...prev,[target.name]:target.value}))} id="standard-basic" label="Name" variant="standard" />
      <TextField color='primary' value={editData?.email}   name='email'  onChange={({target})=>setEditData(prev=>({...prev,[target.name]:target.value}))} id="standard-basic" label="Email" variant="standard" />
      <TextField color='primary' value={editData?.phone}   name='phone' onChange={({target})=>setEditData(prev=>({...prev,[target.name]:target.value}))} id="standard-basic" label="Phone" variant="standard" />
      <TextField color='primary' value={editData.country}   name="country"  onChange={({target})=>setEditData(prev=>({...prev,[target.name]:target.value}))} id="standard-basic" label="Country" variant="standard" />
      <TextField color='primary' value={editData.state}   name="state"  onChange={({target})=>setEditData(prev=>({...prev,[target.name]:target.value}))} id="standard-basic" label="State" variant="standard" />
      <TextField color='primary' value={editData.city}   name="city"  onChange={({target})=>setEditData(prev=>({...prev,[target.name]:target.value}))} id="standard-basic" label="City" variant="standard" />
       
      <Button className='reg-btn' sx={{color:"white"}} onClick={handleEditProfile}  variant="contained" color='main'>Update Profile</Button>
      <Button className='reg-btn' sx={{color:"white"}} onClick={()=>navigate('/profile')}  variant="contained" color='main'>Go Back <IoIosArrowRoundBack size={18} /></Button>


      </form>
    </section>

  
</Layout>
  )
}

export default ProfileEdit