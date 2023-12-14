import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './router/authRoutes.js'
import productRoutes from './router/productRoutes.js'
import { customErrorHandler } from './utils/customErrorHandler.js'
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())



// routers(Api's)

// auth routes
app.use('/api/v1/auth',authRoutes)

// product routes
app.use('/api/v1/product',productRoutes)

// Error handling Middleware
app.use(customErrorHandler)

 export {app}