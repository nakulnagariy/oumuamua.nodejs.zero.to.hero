const path = require('path');
const express = require('express');
// routes
const adminRoutes = require('./admin');
const rootDir = require("../utils/path");
const router = express.Router();

router.get('/', (req, res, next) => {
    const p = adminRoutes.products;

    /**
     * Now we dont have to tell explicitly that
     * where to look for the file simply pass the name
     */
    // res.render(path.join(rootDir, "views", "shop.pug"))
    res.render("shop", {prods: p, pageTitle: "Shop", hasProducts: p.length > 0})
})

module.exports = router;
