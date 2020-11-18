const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb)  {
    cb(null, Date.now() + file.originalname)
  }
})
const fileFilter = function (req, file, cb ) {
  if (file.mimetype === 'image/jpeg' || 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }  
}
const upload = multer({storage, limits: 1024 * 1024 * 5, fileFilter})
const Product = require("../models/product");
const { getAllProducts, getProductById, createProduct, amendProduct, deleteProduct, deleteAllProducts } = require('../controllers/products')


router.get("/", getAllProducts)

router.post("/", auth, upload.single('productImage'), createProduct) 

router.get("/:productId", getProductById) 

router.patch("/:productId", auth, amendProduct) 

router.delete("/:productId", auth, deleteProduct)

router.delete("/", auth, deleteAllProducts) 

module.exports = router;