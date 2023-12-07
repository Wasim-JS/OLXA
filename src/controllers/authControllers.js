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
        next(new throwCustomHandler(400,"All fields are requried"))
    }

    const user = await registerModel.findOne({email})

    if(user) next(new throwCustomHandler(409,"Email already exists"))

    await registerModel.create({
        name,email,password,secret
    }
    )

    return res.status(201).json({
        success:true,
        message:'Registeration Successfull'
    })



})