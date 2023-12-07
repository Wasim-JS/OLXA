import mongoose from "mongoose"

export const dataBaseConnection = async() =>{
    
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        console.log("DataBase Connction Successfull...")
    } catch (error) {
        console.log(`ERROR: Error while connecting to database ${error}`)
        
    }
}