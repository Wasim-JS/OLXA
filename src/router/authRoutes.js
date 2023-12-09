import express from 'express'
import { forgetPassword, login, register, userInfo } from '../controllers/authControllers.js'

const router = express.Router()


// register Api
router.post('/register',register)

// login Api
router.post('/login',login)

// forget password
router.post('/forget-password',forgetPassword)

// get User Info Api
router.get('/me/:id',userInfo)

export default router;