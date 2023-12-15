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
    },
    approved:{
        type:Boolean,
        requried:true,
        default:false
    },

    country:{
        type:String,
        requried:true
    },

    state:{
        type:String,
        requried:true
    },
    city:{
        type:String,
        requried:true
    },
    street:{
        type:String,
        requried:true
    }

})

export const productModel = mongoose.model('Product',productSchema)