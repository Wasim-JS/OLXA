import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
         select:false
    },
    secret:{
         type:String,
         required:true,
    },
    role:{
     type:String,
     default:'user',
    },
    avatar:{
     type:String,
     default:'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png',
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

registerSchema.methods.genrateToken =  function(){
     return jwt.sign({id:this._id},process.env.TOKEN_SECRET,{expiresIn:process.env.TOKEN_EXPRIES})
}


export const registerModel = mongoose.model('User',registerSchema)