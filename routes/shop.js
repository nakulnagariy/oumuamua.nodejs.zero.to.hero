const path = require('path');
const express = require('express');
// routes
const adminRoutes = require('./admin');
const rootDir = require("../utils/path");
const router = express.Router();
const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex)
router.get("/products", shopController.getProducts)
router.get("/product-details", shopController.getDetails)
router.get("/cart", shopController.getCart)
router.get("/checkout", shopController.getCheckout)
router.get("/orders", shopController.getOrders)

module.exports = router;
