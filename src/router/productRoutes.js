import express from 'express'
import { allProducts, clearNotification, createBids, createProduct, deleteBid, enterBidReplies, getFilterProducts, getProductBasedOnId, getProductRelatedToUser } from '../controllers/productControllers.js'
import { upload } from '../utils/HandleImageUpload.js'
import { tokenMiddleWare } from '../middlewares/authMiddleware.js'

const router = express.Router()

//create product Api
router.post('/create-product',upload.array('pimages', 3),createProduct)

// get product releted to user Api
router.get('/reletedProducts',tokenMiddleWare,getProductRelatedToUser)

// get product releted to user city Api
router.get('/all-products',tokenMiddleWare,allProducts)

// get Filtred Products Api
router.get('/filter-products',getFilterProducts)

// raise a bid Api
router.post('/bid/',tokenMiddleWare,createBids)

// delete a bid Api
router.post('/deletebid/',tokenMiddleWare,deleteBid)

// clear all notifications Api
router.get('/clear-notifications',tokenMiddleWare,clearNotification)

//add bid replies Api
router.post('/bid-replies',tokenMiddleWare,enterBidReplies)

// get product Based on Id Api
router.get('/single/:id',tokenMiddleWare,getProductBasedOnId)




export default router