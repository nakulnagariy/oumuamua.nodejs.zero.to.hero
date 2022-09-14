const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add product",
        productCSS: true,
        path: "/admin/add-product",
        formCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin products",
            path: "/admin/products",
        })
    });
}