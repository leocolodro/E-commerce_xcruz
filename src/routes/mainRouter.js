//Express
const express = require('express');
const router = express.Router();

//Path
const path = require('path');

//MainController - require
const MainController = require(path.join(__dirname, '../controllers/mainController.js'));

/*+++++++++++++++ Routers - require´s ++++++++++++++++++*/
const productRouter = require(path.join(__dirname, '../routes/productRouter.js'));
const userRouter = require(path.join(__dirname,'../routes/userRouter.js'));
const cartRouter = require(path.join(__dirname,'../routes/cartRouter.js'));

router.get('/', MainController.displayHome);

router.use('/user', userRouter);

router.use('/producto', productRouter);

router.use('/cart', cartRouter);

module.exports = router;