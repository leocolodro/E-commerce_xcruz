//Express
const express = require('express');
const app = express();

//Path
const path = require('path');

//Port
const port = 3030;

//Routes
const productRouter = require(path.join(__dirname, '/routes/productRouter.js'));
const userRouter = require(path.join(__dirname,'/routes/userRouter.js'));
const mainRouter = require(path.join(__dirname, '/routes/mainRouter.js'));
const cartRouter = require(path.join(__dirname,'/routes/cartRouter.js'));


app.listen(process.env.PORT || port, ()=>{
    console.log("Server Status: Online");
});

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use('/', mainRouter);

app.use('/user', userRouter);

app.use('/producto', productRouter);

app.use('/cart', cartRouter)


