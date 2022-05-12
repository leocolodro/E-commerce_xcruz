//Express
const express = require('express');
const app = express();

//Path
const path = require('path');

//Routes
const productRouter = require(path.join(__dirname, '/routes/productRouter.js'));
const registerRouter = require(path.join(__dirname,'/routes/registerRouter.js'));
const adminRouter = require(path.join(__dirname,'/routes/adminRouter.js'));
const loginRouter = require(path.join(__dirname,'/routes/loginRouter.js'));
const homeRouter = require(path.join(__dirname, '/routes/homeRouter.js'));
const cartRouter = require(path.join(__dirname,'/routes/cartRouter.js'));


app.listen(process.env.PORT || 3030, ()=>{
    console.log("Server Status: Online");
});

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use('/', homeRouter);

app.use('/producto', productRouter);

app.use('/register', registerRouter);

app.use('/adm', adminRouter);

app.use('/login', loginRouter);

app.use('/cart', cartRouter)


