const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add product",
        path: "/admin/add-product",
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    // create will create a modal and saves it, instead of build will not save
    Product.create({
      title: title,
      imageUrl: imageUrl,
      description: description,
      price: price
    }).then(result => {
      console.log(result);
      res.redirect('/admin/products');
    }).catch((err) => {
      console.error(err);
    })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId).then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    }).catch((err) => {
      console.error(err);
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId).then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    }).then(result => {
      console.log("result", result);
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err)
    })
  };

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin products",
            path: "/admin/products",
        })
    }).catch(err => {
      console.log(err)
    })
}


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then(product => {
      product.destroy();
    }).then(result => {
      console.log("product deleted");
    }).catch(err => {
      console.log(err)
    })
    res.redirect('/admin/products');
  };
