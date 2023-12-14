import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    year:{
        type:String,
        requried:true
    },
    price:{
        type:Number,
        requried:true
    },
    category:{
        type:String,
        requried:true
    },
    hasWarranty:{
        type:Boolean,
        requried:true,
        default:false
    },
    hasBill:{
        type:Boolean,
        requried:true,
        default:false
    },
    desc:{
        type:String,
        requried:true,
    },
    pimages:[
        {
            publicId:{
                type:String
            },
          cloudLink:{
            type:String
          },
          multerLink:
          {
            type:String
          }
        }
    ],
    owner:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
    }

})

export const productModel = mongoose.model('Product',productSchema)