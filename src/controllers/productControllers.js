import { asyncErrorHandler } from "../utils/AsyncErrorHandler.js";
import { uploadImageToCloud } from "../utils/HandleImageUpload.js";
import { throwCustomHandler } from "../utils/throwCustomError.js";
import {productModel} from '../models/productModel.js'
export const createProduct = asyncErrorHandler(async(req,res,next)=>{

    const images = req.files;
  

    const uploadedImages = images.map(async(image) =>{
       const cloudImage =  await uploadImageToCloud(image.path)
       const imageObj = {
          publicId:cloudImage.public_id,
          cloudLink:cloudImage.secure_url,
          multerLink:image.filename
       }

      return imageObj;
    });

    let cloudinaryResponses = await Promise.all(uploadedImages).catch((error) => {
        console.error('Error during Cloudinary upload:', error);
        return new throwCustomHandler(400,"Error during Cloudinary upload")
       });

     req.body = {...req.body,pimages:cloudinaryResponses}

    await productModel.create(req.body)

    return res.status(201).json({
        success:true,
        message:'Product Created Successfully'
    })

})


export const getProductRelatedToUser = asyncErrorHandler(async(req,res,next)=>{

    const products = await productModel.find({owner:req.user._id})

    return res.status(200).json({
        success:true,
        products
    })
})


export const cityProducts = asyncErrorHandler(async(req,res,next)=>{

    const products = await productModel.find({city:req.user.city})

    return res.status(200).json({
        success:true,
        products
    })
})

export const getProductBasedOnId = asyncErrorHandler(async(req,res,next)=>{

    const id = req.params.id

    const product = await productModel.findById(id)

    if(!product) return new throwCustomHandler(404,"Product Not Found")


    return res.status(200).json({
        success:true,
        product
    })

})




