const path = require('path');
const express = require('express');
const rootDir = require("../utils/path");
const router = express.Router();

const products = [];
// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    res.render("add-product", {
      pageTitle: "Add product",
      productCSS: true,
      path: "/admin/add-product",
      formCSS: true,
      activeAddProduct: true
    })
})

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    products.push(({title: req.body.title}));
    res.redirect('/');
  });

  console.log("git stash")
  
exports.routes = router;
exports.products = products;
