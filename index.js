const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    // res.send("<h1>Hello from the other side</h1>")
    console.log("in the middleware")
    // Allows the request to continue to the next middleware in line
    next();
});

app.use((req, res, next) => {
    res.send("<h1>Hello from the another side</h1>")
    console.log("in the other middleware")
});

app.listen(8080, () => {
    console.log("your app is started on port 8080");
})