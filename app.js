//Express
const express = require('express');
const app = express();

//Path
const path = require('path');

//Routes
const productRouter = require('./src/routes/productRouter.js');
const registerRouter = require('./src/routes/registerRouter.js');
const loginRouter = require('./src/routes/loginRouter.js');
const homeRouter = require('./src/routes/homeRouter.js');
const cartRouter = require('./src/routes/cartRouter.js');


app.listen(3030, ()=>{
    console.log("Server Status: Online");
});

app.set("view engine", "ejs");

app.use(express.static("public"));

//ROUTING
app.use('/', homeRouter);

app.use('/home', homeRouter);

app.use('/producto', productRouter);

app.use('/registro', registerRouter);

app.use('/login', loginRouter);

app.use('/cart', cartRouter)



