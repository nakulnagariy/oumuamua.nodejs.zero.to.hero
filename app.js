const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// parse application/json
// app.use(bodyParser.json())

// app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send(path.join(__dirname, 'views', '404.html'));
})

app.listen(8080, () => {
    console.log("your app is started on port 8080");
})
