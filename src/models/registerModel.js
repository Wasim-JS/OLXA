import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const registerSchema = new mongoose.Schema({

    name:{
         type:String,
         required:true
    },
    email:{
         type:String,
         required:true,
         unique:true,
         trim:true
    },
    password:{
         type:String,
         required:true,
    },
    secret:{
         type:String,
         required:true,
    },
    role:{
     type:String,
     default:'user',
    }
},{timestamps:true})

registerSchema.pre('save',async function(next){
  
     if(!this.isModified('password')) return next()

     this.password = await bcrypt.hash(this.password,10)
     next()
})

registerSchema.methods.checkPassword = async function(password){
      return await bcrypt.compare(password,this.password)
}


export const registerModel = mongoose.model('User',registerSchema)