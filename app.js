const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// EJS
app.set('view engine', 'ejs');
app.set("views", "views")

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)

app.listen(8080, () => {
    console.log("your app is started on port 8080");
})
