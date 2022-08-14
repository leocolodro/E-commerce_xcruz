//@Author: Bautista

/************* Require's ************/
const express = require('express');
const productApiController = require('../../controllers/api/productApiController.js');
const router = express.Router();
/***********************************/

router.get('/', productApiController.listAll);
router.get('/:id', productApiController.listOne);

module.exports = router;