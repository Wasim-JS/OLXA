import { throwCustomHandler } from "../utils/throwCustomError.js"

export const checkIsAdmin =(req,_,next) =>{

    if(req.user.role !== 'admin') return next (new throwCustomHandler(401,'UnAuthorized Access'))

    next();

}

