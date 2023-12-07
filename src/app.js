import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './router/authRoutes.js'
import { customErrorHandler } from './utils/customErrorHandler.js'
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())


// routers

app.use('/api/v1/auth',authRoutes)

app.use(customErrorHandler)

 export {app}