/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable no-underscore-dangle */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const errorController = require('./controllers/error');
const { mongoConnect } = require('./util/database');
const User = require('./models/user');

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('63adcdc6eba754f0be8b7148')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(8080);
});
