import { asyncErrorHandler } from "../utils/AsyncErrorHandler.js";
import { uploadImageToCloud } from "../utils/HandleImageUpload.js";
import { throwCustomHandler } from "../utils/throwCustomError.js";
import { productModel } from "../models/productModel.js";
import FilterSearch from "../utils/FilterSearch.js";
import { bidModel } from "../models/BidsModel.js";
import { registerModel } from "../models/registerModel.js";
import cloudinary from 'cloudinary'
import fs from 'fs'


export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const images = req.files;

  const uploadedImages = images.map(async (image) => {
    const cloudImage = await uploadImageToCloud(image.path);
    const imageObj = {
      publicId: cloudImage.public_id,
      cloudLink: cloudImage.secure_url,
      multerLink: image.filename,
    };

    return imageObj;
  });

  let cloudinaryResponses = await Promise.all(uploadedImages).catch((error) => {
    console.error("Error during Cloudinary upload:", error);
    return new throwCustomHandler(400, "Error during Cloudinary upload");
  });

  req.body = { ...req.body, pimages: cloudinaryResponses };

  await productModel.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Product Created Successfully",
  });
});

export const getProductRelatedToUser = asyncErrorHandler(
  async (req, res, next) => {
    const products = await productModel.find({ owner: req.user._id });

    return res.status(200).json({
      success: true,
      products,
    });
  }
);

export const allProducts = asyncErrorHandler(async (_, res, next) => {
  const products = await productModel.find();

  return res.status(200).json({
    success: true,
    products,
  });
});

export const getProductBasedOnId = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await productModel
    .findById(id)
    .populate("owner") // populate the owner field with the User document
    .populate({
      path: "bids",
      populate: [
        { path: "bidder", model: "User" }, // populate the bidder field within bid with the User document
        { path: "replies.sender", model: "User" }, // populate the sender field within the replies array with the User document
      ],
    });

  if (!product) return new throwCustomHandler(404, "Product Not Found");

  return res.status(200).json({
    success: true,
    product,
  });
});

export const getFilterProducts = asyncErrorHandler(async (req, res, next) => {
  let { keyword, gt=0, lt=0, page,city="",street="" } = req.query;
  gt = Number(gt);
  lt = Number(lt);
  page = Number(page);

  console.log(keyword, gt, lt, page,city,street);

  const countOf = new FilterSearch(productModel)
    .keywordSearch(keyword)
    .priceSearch(gt, lt)
    .cityAndSteetSearch(city,street)

  const productCount = await productModel.countDocuments(countOf.queryString);

  const noOfrecords = 1;
  const queryData = new FilterSearch(productModel)
    .keywordSearch(keyword)
    .priceSearch(gt, lt)
    .cityAndSteetSearch(city,street)
    .setLimit(noOfrecords, page);

  const filterProducts = await queryData.query;

  return res.status(200).json({
    success: true,
    total: productCount,
    totalProductsFetched: filterProducts.length,
    products: filterProducts,
  });
});

export const createBids = asyncErrorHandler(async (req, res, next) => {
  const { productId, bidPrice } = req.body;

  //  raise a bid
  req.body = { ...req.body, bidPrice: Number(bidPrice), bidder: req.user._id };
  const bid = new bidModel(req.body);
  await bid.save();

  // add bid id to product
  const product = await productModel.findById(productId);
  if (!product) return new throwCustomHandler(404, "Product Not Found");

  product.bids.push(bid._id);
  await product.save({ validateBeforeSave: false });

  //  give notification to user
  const notifiUser = await registerModel.findById(product?.owner?._id);

  notifiUser.noOfNotifications += 1;
  let notificationToAdd = {
    notificationDesc: `You Have a New Bid Raised On ${product?.name}`,
    gotoProduct: product._id.toString(),
  };
  console.log("notificationToAdd " + notificationToAdd);
  notifiUser.notifications.push(notificationToAdd);

  await notifiUser.save({ validateBeforeSave: false });

  return res.status(201).json({
    success: true,
    message: "Bid Raised Successfully",
  });
});

export const deleteBid = asyncErrorHandler(async (req, res, next) => {
  const { bidId, productId } = req.body;
  console.log("delete");
  console.log(bidId, productId);

  await bidModel.findByIdAndDelete(bidId);

  const product = await productModel.findById(productId);
  if (!product) return new throwCustomHandler(404, "Product Not Found");

  const newBids = product.bids.filter((bid) => bid.toString() !== bidId);
  product.bids = newBids;

  await product.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Bid Deleted Successfully",
  });
});

export const clearNotification = asyncErrorHandler(async (req, res, next) => {
  console.log("cleared");
  const user = await registerModel.findById(req.user._id);
  user.noOfNotifications = 0;
  user.notifications = [];

  user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "All Notifications Cleared...",
  });
});

export const enterBidReplies = asyncErrorHandler(async (req, res, next) => {
  const { toSendNoti, message, bidId, productId,postedOn } = req.body;

  const bid = await bidModel.findById(bidId);

  if (!bid) return new throwCustomHandler(404, "Bid Not Found");
  const reply = {
    sender: req.user._id,
    message,
    postedOn
  };

  bid.replies = [...bid.replies, reply];
  await bid.save({ validateBeforeSave: false });

  const toSend = await registerModel.findById(toSendNoti);

  const product = await productModel.findById(productId).select("+name +_id");
  if (!product) return new throwCustomHandler(404, "Product Not Found");

  toSend.noOfNotifications += 1;
  let notificationToAdd = {
    notificationDesc: `You Have a New Message On ${product?.name}`,
    gotoProduct: product?._id,
  };
  toSend.notifications.push(notificationToAdd);

  await toSend.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Thanks for Reply",
  });
});

export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  console.log("delete id ",id);

  const product = await productModel.findById(id);

  product?.pimages.forEach((pimage) => {
            const { multerLink, publicId } = pimage;

            fs.unlink(`src/public/images/${multerLink}`, async (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted successfully");
                await cloudinary.uploader.destroy(publicId);
            }
            });
      });



      const productOwner = await registerModel.findById(product?.owner)


      productOwner.noOfNotifications += 1;
     let notificationToAdd = {
       notificationDesc: `Your Product ${product?.name} is Rejected and deleted by Admin`,
       gotoProduct: "",
     };
     console.log("notificationToAdd " + notificationToAdd);
     productOwner.notifications.push(notificationToAdd);
     await productOwner.save({ validateBeforeSave: false });

      await productModel.findByIdAndDelete(id)


    

      return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
      });
});


export const approveProduct = asyncErrorHandler(async (req, res, next) => {

    const { id } = req.params;

   let product = await productModel.findByIdAndUpdate(id,

    {
        $set:{
            approved:true
        }
    },
    {
        new:true
    }

    )


   const productOwner = await registerModel.findById(product?.owner)


   productOwner.noOfNotifications += 1;
  let notificationToAdd = {
    notificationDesc: `Your Product ${product?.name} got approved by Admin,Now You Can Receive the Bids on this product`,
    gotoProduct: product._id.toString(),
  };
  console.log("notificationToAdd " + notificationToAdd);
  productOwner.notifications.push(notificationToAdd);

  await productOwner.save({ validateBeforeSave: false });


    return res.status(200).json({
        success: true,
        message: "Product Approved Successfully",
      });

})

export const soldProduct = asyncErrorHandler(async (req, res, next) => {

  const { id } = req.params;

 await productModel.findByIdAndUpdate(id,

  {
      $set:{
          sold:'yes'
      }
  },
  {
      new:true
  }

  )


  return res.status(200).json({
    success: true,
    message: "Congrulations.. You Sold Your Product Successfully..",
  });

})