import mongoose from "mongoose";

const bidSchmea = new mongoose.Schema({

    bidder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bidPrice:{
        type:Number,
        required:true,
        default:0
    },
    bidDesc:{
        type:String,
    },
    replies:[
       {
            sender:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            message:{
                type:String
            }
       }
    ]


},{timestamps:true})

export const bidModel = mongoose.model('Bid',bidSchmea)