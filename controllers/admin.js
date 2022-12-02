/* eslint-disable no-param-reassign */
const Product = require('../models/product');
const logger = require('../util/logger');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const {
    title, imageUrl, description, price,
  } = req.body;
  // create will create a modal and saves it, instead of build will not save
  Product.create({
    title,
    imageUrl,
    description,
    price,
    userId: req.user.id,
  })
    .then((result) => {
      logger.info(JSON.stringify(result), { meta: 'postAddProduct' });
      res.redirect('/admin/products');
    })
    .catch((err) => {
      logger.error(err, { meta: 'postAddProduct' });
    });
};

// eslint-disable-next-line consistent-return
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    // eslint-disable-next-line consistent-return
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product,
      });
    })
    .catch((err) => {
      logger.error(err, { meta: 'getEditProduct' });
    });
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then((result) => {
      logger.info(JSON.stringify(result), { meta: 'postEditProduct' });
      res.redirect('/admin/products');
    })
    .catch((err) => {
      logger.error(err, { meta: 'postEditProduct' });
    });
};

exports.getProducts = (req, res) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin products',
        path: '/admin/products',
      });
    })
    .catch((err) => {
      logger.error(err, { meta: 'getProducts' });
    });
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      product.destroy();
    })
    .then((result) => {
      logger.info(JSON.stringify(result), { meta: 'postDeleteProduct' });
    })
    .catch((err) => {
      logger.error(err, { meta: 'postDeleteProduct' });
    });
  res.redirect('/admin/products');
};
