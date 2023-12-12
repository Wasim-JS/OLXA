import multer from 'multer';
import cloudinary from 'cloudinary'



// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/images/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });


  export function uploadImageToCloud(path)
  {
    console.log("reached....")
      return cloudinary.uploader.upload(path,{folder:'myImages',width:150,crop:'scale'}, (error, result) => {
          if (error) {
            console.error(error);
          } 
        })
  }

 export const upload = multer({ storage: storage });