const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

// routes
const userRoutes = require('./routes/user');
const defaultRouter = require('./routes/default');

app.use(userRoutes);

app.use(defaultRouter);

app.listen(8080, () => {
    console.log("your app is started on port 8080");
})
