import axios from "axios"


export async function sendToken ()
{

  try {
    const login = await axios.get('/api/v1/auth/me')
    return login.data.user
    
  } catch (error) {
   console.log(error)
  }
}