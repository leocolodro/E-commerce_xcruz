//@Author: Bautista

/*++++++++++++++ Requires ++++++++++++++*/
const express = require('express');
const router = express.Router();
/*++++++++++++++++++++++++++++++++++++++++++++++*/

/*++++++++++++++ Routers requires ++++++++++++++*/
const userApi = require('./userApi.js');
const productApi = require('./productApi.js');
/*++++++++++++++++++++++++++++++++++++++++++++++*/

/*++++++++++++++ Routing requires ++++++++++++++*/

router.use('/usuarios', userApi);
router.use('/productos', productApi);

module.exports = router;