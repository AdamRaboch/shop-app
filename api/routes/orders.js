const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const Order = require("../models/order");
const Product = require("../models/product");
const { getAllOrders, createNewOrder, getOrderById, deleteOrderById } = require('../controllers/orders')

router.get("/", auth, getAllOrders);

router.post("/", auth, createNewOrder)

router.get("/:orderId", auth, getOrderById) 

router.delete("/:orderId", auth, deleteOrderById)

module.exports = router;