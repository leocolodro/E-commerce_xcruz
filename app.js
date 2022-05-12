//Express
const express = require('express');
const app = express();

//Path
const path = require('path');

//Routes
const productRouter = require(path.join(__dirname, 'src/routes/productRouter.js'));
//const registerRouter = require('./src/routes/registerRouter.js');
//const adminRouter = require('./src/routes/adminRouter.js')
//const loginRouter = require('./src/routes/loginRouter.js');
const homeRouter = require(path.join(__dirname, 'src/routes/homeRouter.js'));
//const cartRouter = require('./src/routes/cartRouter.js');


app.listen(process.env.PORT || 3030, ()=>{
    console.log("Server Status: Online");
});

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use('/', homeRouter);

app.use('/producto', productRouter);

//app.use('/register', registerRouter);

//app.use('/adm', adminRouter);

//app.use('/login', loginRouter);

//app.use('/cart', cartRouter)


