import dotenv from 'dotenv'
dotenv.config()
import { dataBaseConnection } from './DB/dataBaseConnection.js'
import { app } from './app.js'


dataBaseConnection().then(()=>{
 
    app.listen(process.env.PORT,()=>{
        console.log(`server is running at port:${process.env.PORT}`)
    })
}).catch(()=>{
    console.log("ERROR in database connection")
})