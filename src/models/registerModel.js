import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const avatarSvhema = new mongoose.Schema({
  publicId: {
    type: String,
  },
  cloudLink: {
    type: String,
  },
  multerLink: {
    type: String,
  },
});

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    secret: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    noOfNotifications:{
          type:Number,
          default:0
    },
    notifications:[
      // {
      //   notificationDesc:{
      //     type:String
        
      //   },

      //   gotoProduct:{
      //       type:String
      //   }
      // }
    ],
    avatar: [avatarSvhema],
  },
  { timestamps: true }
);

registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

registerSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

registerSchema.methods.genrateToken = function () {
  return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPRIES,
  });
};

export const registerModel = mongoose.model("User", registerSchema);
