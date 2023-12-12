import dotenv from 'dotenv'
dotenv.config()
import cloudinary from 'cloudinary';
import { dataBaseConnection } from './DB/dataBaseConnection.js'
import { app } from './app.js'


dataBaseConnection().then(()=>{
 
    app.listen(process.env.PORT,()=>{
        console.log(`server is running at port:${process.env.PORT}`)
    })
}).catch(()=>{
    console.log("ERROR in database connection")
})


// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });