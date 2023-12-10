import { registerModel } from "../models/registerModel.js"
import { throwCustomHandler } from "../utils/throwCustomError.js"
import jwt from 'jsonwebtoken'


export const tokenMiddleWare = async(req,res,next) =>{

    const { token } = req.cookies

    if(!token) return next (new throwCustomHandler(401,'UnAuthorized Access'))
     
    const { id } = jwt.verify(token,process.env.TOKEN_SECRET)

    let user = await registerModel.findById({_id:id})

    req.user = user;
    next();

}

