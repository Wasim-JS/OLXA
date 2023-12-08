import { registerModel } from "../models/registerModel.js";
import { asyncErrorHandler } from "../utils/AsyncErrorHandler.js"
import { throwCustomHandler } from "../utils/throwCustomError.js";

export const register = asyncErrorHandler(async(req,res,next)=>{

    const {name,email,password,secret} = req.body;
    console.log(req.body)

    if(
        [name,email,password,secret].some(field=> field === "")
    )
    {
       return next(new throwCustomHandler(400,"All fields are requried"))
    }

    const regex = new RegExp(email, 'i');

    const user = await registerModel.findOne({email:{ $regex: regex }})

    if(user) return next(new throwCustomHandler(409,"Email already exists"))

    await registerModel.create({
        name,email,password,secret
    }
    )

    return res.status(201).json({
        success:true,
        message:'Registeration Successfull'
    })



})

export const login = asyncErrorHandler(async(req,res,next)=>{

    const{email,password}=req.body;

    const regex = new RegExp(email, 'i');

    const user = await registerModel.findOne({email:{ $regex: regex }})

    if(!user) return next(new throwCustomHandler(400,"Invalid Credintials")) 

    const isMatch = await user.checkPassword(password)

    if(!isMatch) return next(new throwCustomHandler(400,"Invalid Email or Password"))

    return res.status(200).json({
        success:true,
        message:'Login Successfull'
    })

})

export const forgetPassword = asyncErrorHandler(async(req,res,next)=>{

    const{email,secret,newPassword}=req.body;

    const regex = new RegExp(email, 'i');

    const user = await registerModel.findOne({email:{ $regex: regex }});

    if(!user) return next(new throwCustomHandler(400,"Invalid Credintials"));

    if(secret !== user.secret) return next(new throwCustomHandler(400,"Your Answer is Wrong")); 

    user.password = newPassword;

    await user.save();

  
    return res.status(200).json({
        success:true,
        message:'Password Reset Successfull'
    })


})