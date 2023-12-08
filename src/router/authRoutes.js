import express from 'express'
import { forgetPassword, login, register } from '../controllers/authControllers.js'

const router = express.Router()


// register Api
router.post('/register',register)

// login Api
router.post('/login',login)

// forget password
router.post('/forget-password',forgetPassword)

export default router;