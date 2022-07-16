//Express
const express = require('express');
const router = express.Router();

//Path
const path = require('path');

//MainController - require
const mainController = require(path.join(__dirname, '../controllers/mainController.js'));

/*+++++++++++++++ Routers - require´s ++++++++++++++++++*/
const productRouter = require(path.join(__dirname, '../routes/productRouter.js'));
const userRouter = require(path.join(__dirname,'../routes/userRouter.js'));
const cartRouter = require(path.join(__dirname,'../routes/cartRouter.js'));

router.get('/', mainController.displayHome);

router.get('/sucursales', mainController.displayBranches)

router.use('/usuarios', userRouter);

router.use('/productos', productRouter);

router.use('/cart', cartRouter);

module.exports = router;