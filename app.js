const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const app = express();

// routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// EJS
app.set('view engine', 'ejs');
app.set("views", "views")


// Handlebars
// app.engine(
//     'hbs',
//     expressHbs.engine({
//       layoutsDir: 'views/layouts/',
//       defaultLayout: 'main-layout',
//       extname: 'hbs'
//     })
//   );
// // set you view engine
// app.set('view engine', 'hbs');
// app.set("views", "views")


// PUG
// set you view engine, pug is built-in engine in express
// app.set('view engine', 'pug');

// tell the express where to find the our views, 
// we can name anything and refer the same name to second params
// app.set("views", "views")
// parse application/json
// app.use(bodyParser.json())

// app.use(userRoutes);
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: "Page not found",
        path: null
    });
})

app.listen(8080, () => {
    console.log("your app is started on port 8080");
})
