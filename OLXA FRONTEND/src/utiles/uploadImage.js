import axios from 'axios'
export const uplaodProfileImage = async(formData) =>{

    try {
        const upload = await axios.post('/api/v1/auth/upload-pic',formData)
         return upload.data
        
      } catch (error) {
       console.log(error)
      }


}