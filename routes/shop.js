const path = require('path');
const express = require('express');
// routes
const adminRoutes = require('./admin');
const rootDir = require("../utils/path");
const router = express.Router();
const productController = require('../controllers/products')

router.get('/', productController.getProduct)

module.exports = router;
