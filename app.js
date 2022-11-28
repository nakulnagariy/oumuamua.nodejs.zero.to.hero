const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');

const sequelize = require('./utils/database');
const errorController = require('./controllers/error');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// EJS
app.set('view engine', 'ejs');
app.set("views", "views");
// Create the connection pool. The pool-specific settings are the defaults
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'jan2022@Nua361',
//     database: 'complete_node'
//   });

// // For pool initialization, see above
// pool.execute("SELECT * FROM product", function(err, rows, fields) {
//     // Connection is automatically released when query resolves
//     if(!err) {
//         console.log("data", rows)
//     }
//  })

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)

// sync will create the table from the model for you everytime you run the app if already not exists
sequelize.sync().then(resulter => {
    app.listen(8080, () => {
        console.log("your app is started on port 8080");
    })
}).catch(err => {
    console.log("error", err)
})

