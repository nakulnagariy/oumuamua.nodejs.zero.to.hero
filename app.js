const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const app = express();

// routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');

const sequelize = require('./utils/database');
const errorController = require('./controllers/error');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.error(err);
    })
})
// EJS
app.set('view engine', 'ejs');
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)

// through means where this relationship exists, here CartItem will be another table

Product.belongsTo(User, { constrain: true, onDelete: 'CASCADE' });

User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
// sync will create the table from the model for you everytime you run the app if already not exists
// force: true will override the existing table, dont do it in prod.

/**
 * below user is created for the dev purpose only
 */
sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: "John", email: "john@example.com" })
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
      })
    .then(cart => {
        console.log("cart", cart);
        app.listen(8080, () => {
            console.log("your app is started on port 8080");
        })
    }).catch(err => {
        console.log("error", err)
    })

