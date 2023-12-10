import express from 'express'
import { forgetPassword, login, logout, register, userInfo } from '../controllers/authControllers.js'
import { tokenMiddleWare } from '../middlewares/authMiddleware.js'

const router = express.Router()


// register Api
router.post('/register',register)

// login Api
router.post('/login',login)

// forget password
router.post('/forget-password',forgetPassword)

// get User Info Api
router.get('/me',tokenMiddleWare,userInfo)

// logout Api
router.get('/logout',logout)

export default router;