const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "Shop",
            path: "/products"
        })
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
        })
    });
}

exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: "Your cart",
        path: "/cart"
    })
}

exports.getDetails = (req, res, next) => {
    res.render("shop/product-details", {
        pageTitle: "Product Details",
        path: "/product-details"
    })
}

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout"
    })
}

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "Your orders",
        path: "/orders"
    })
}