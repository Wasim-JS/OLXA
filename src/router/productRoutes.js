import express from 'express'
import { createProduct, getProductRelatedToUser } from '../controllers/productControllers.js'
import { upload } from '../utils/HandleImageUpload.js'
import { tokenMiddleWare } from '../middlewares/authMiddleware.js'

const router = express.Router()

//create product Api
router.post('/create-product',upload.array('pimages', 3),createProduct)

// get product releted to user
router.get('/reletedProducts',tokenMiddleWare,getProductRelatedToUser)

export default router