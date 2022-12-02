const Product = require('../models/product');
const logger = require('../util/logger');

exports.getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((err) => {
      logger.error(err, { meta: 'getProducts' });
    });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  // const options = {
  //   where: { product: prodId },
  // };
  // findAll @return array of element
  // Product.findAll({where : { id: prodId }}).then(products => {
  //   res.render('shop/product-detail', {
  //     product: products[0],
  //     pageTitle: products[0].title,
  //     path: '/products'
  //   });
  // }).catch(err => {
  //   console.log(err);
  // })

  // we can also try findById
  // findByPk @return an element

  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch((err) => {
      logger.error(err, { meta: 'getProduct' });
    });
};

exports.getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => {
      logger.error(err, { meta: 'getIndex' });
    });
};

exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => cart
      .getProducts()
      .then((products) => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products,
        });
      })
      .catch((err) => {
        logger.error(err, { meta: 'getCart' });
      })).catch((err) => {
      logger.error(err, { meta: 'getCart1' });
    });
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        [product] = products;
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => fetchedCart.addProduct(product, {
      through: { quantity: newQuantity },
    }))
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => logger.error(err, { meta: 'postCart' }));
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => cart.getProducts({ where: { id: prodId } }))
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => logger.error(err, { meta: 'postCartDeleteProduct' }));
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders,
      });
    })
    .catch((err) => logger.error(err, { meta: 'getOrders' }));
};

exports.postOrder = (req, res) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => req.user
      .createOrder()
      .then((order) => order.addProducts(
        products.map((product) => {
          // eslint-disable-next-line no-param-reassign
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        }),
      ))
      .catch((err) => logger.error(err, { meta: 'postOrder' }))).then(() => fetchedCart.setProducts(null))
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => logger.error(err, { meta: 'postOrder1' }));
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
