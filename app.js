const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pug = require("pug");

const app = express();

// routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

// tell the express where to find the our views, 
// we can name anything and refer the same name to second params
app.set("views", "views")
// parse application/json
// app.use(bodyParser.json())

// app.use(userRoutes);
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404.pug', {pageTitle: "Page not found"});
})

app.listen(8080, () => {
    console.log("your app is started on port 8080");
})
