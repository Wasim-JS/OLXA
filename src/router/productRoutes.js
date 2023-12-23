import express from 'express'
import { allProducts, createBids, createProduct, deleteBid, getFilterProducts, getProductBasedOnId, getProductRelatedToUser } from '../controllers/productControllers.js'
import { upload } from '../utils/HandleImageUpload.js'
import { tokenMiddleWare } from '../middlewares/authMiddleware.js'

const router = express.Router()

//create product Api
router.post('/create-product',upload.array('pimages', 3),createProduct)

// get product releted to user
router.get('/reletedProducts',tokenMiddleWare,getProductRelatedToUser)

// get product releted to user city
router.get('/all-products',tokenMiddleWare,allProducts)

// get Filtred Products
router.get('/filter-products',getFilterProducts)

// raise a bid
router.post('/bid/',tokenMiddleWare,createBids)

// delete a bid
router.post('/deletebid/',tokenMiddleWare,deleteBid)

// get product Based on Id
router.get('/single/:id',tokenMiddleWare,getProductBasedOnId)




export default router