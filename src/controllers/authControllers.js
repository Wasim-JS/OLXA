import { registerModel } from "../models/registerModel.js";
import { asyncErrorHandler } from "../utils/AsyncErrorHandler.js"
import { uploadImageToCloud } from "../utils/HandleImageUpload.js";
import { throwCustomHandler } from "../utils/throwCustomError.js";
import cloudinary from 'cloudinary'
import fs from 'fs'

export const register = asyncErrorHandler(async(req,res,next)=>{

    const {name,email,password,secret,phone,city,state,country} = req.body;
    console.log(req.body)

    if(
        [name,email,password,secret,phone,city,state,country].some(field=> field === "")
    )
    {
       return next(new throwCustomHandler(400,"All fields are requried"))
    }

    const regex = new RegExp(email, 'i');

    const user = await registerModel.findOne({email:{ $regex: regex }})

    if(user) return next(new throwCustomHandler(409,"Email already exists"))

    await registerModel.create({
        name,email,password,secret,phone,city,state,country
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

    const user = await registerModel.findOne({email:{ $regex: regex }}).select("+password")

    if(!user) return next(new throwCustomHandler(400,"Invalid Credintials")) 

    const isMatch = await user.checkPassword(password)

    if(!isMatch) return next(new throwCustomHandler(400,"Invalid Email or Password"))

    const token = user.genrateToken()

    return res.cookie('token', token, { maxAge: 7 * 24 * 60 * 60 * 1000}).status(200).json({
        success:true,
        message:'Login Successfull',
        user,
        token
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


export const userInfo = asyncErrorHandler(async(req,res,next)=>{

    

    const user = req.user
    if(!user) return next(new throwCustomHandler(400,"User Does Not Exists"));
    
    return res.status(200).json({
        success:true,
        user
    })
})

export const uplaodProfilePic = asyncErrorHandler(async(req,res,next)=>{
    
     const user = await registerModel.findById(req.user._id)

     if(user.avatar.length>0)
     {
          const {publicId:oldPublicId,multerLink:oldMulterLink} = user.avatar[0]

          fs.unlink(`src/public/images/${oldMulterLink}`, async(err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted successfully');
              await cloudinary.uploader.destroy(oldPublicId);
            }
          });

     }

     const multerLinks = req.file.filename
     const couldImages=  await uploadImageToCloud(req.file.path)
     const publicIds = couldImages.public_id
     const cloudLinks = couldImages.secure_url
     
     user.avatar = []
     const avatarData = {
        publicId:publicIds,
          cloudLink:cloudLinks,
          multerLink:multerLinks
     }

     user.avatar.push(avatarData)
     await user.save()

        return res.status(200).json({
            success:true,
            message:"Image Uploaded Successfully"
        })
    

   
}
)


export const logout = asyncErrorHandler(async(req,res,next)=>{

    return res.cookie("token",'',{maxAge: new Date(1)}).status(200).json({
        success:true,
        message:"Logout Successfull..",
    })
})

export const changePassword = asyncErrorHandler(async(req,res,next)=>{
    const {oldPassword,newPassword} = req.body;

    if([oldPassword,newPassword].some(field=> field === ""))
        {
            return next(new throwCustomHandler(400,"All Fields are requried"));
        }


        const user = await registerModel.findById(req.user._id).select("+password")

        if(!user) return next(new throwCustomHandler(400,"User Not Found"));

        const isMatchPassword = await user.checkPassword(oldPassword)

        if(!isMatchPassword) return next(new throwCustomHandler(400,"Old Password is Wrong"));

        user.password = newPassword;
        await user.save({validateBeforeSave:false})

        return res.status(200).json({
            success:true,
            message:"Password Changed Successfully"
        })

})