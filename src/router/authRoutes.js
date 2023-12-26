import express from 'express'
import { changePassword, forgetPassword, login, logout, register, uplaodProfilePic, userInfo } from '../controllers/authControllers.js'
import { tokenMiddleWare } from '../middlewares/authMiddleware.js'
import { upload } from '../utils/HandleImageUpload.js'

const router = express.Router()


// register Api
router.post('/register',register)

// login Api
router.post('/login',login)

// forget password
router.post('/forget-password',forgetPassword)

// get User Info Api
router.get('/me',tokenMiddleWare,userInfo)

// upload profile pic
router.post('/upload-pic',tokenMiddleWare,upload.single('profilePic'),uplaodProfilePic)

// logout Api
router.get('/logout',logout)

// change Password Api
router.post('/change-password',tokenMiddleWare,changePassword)

export default router;