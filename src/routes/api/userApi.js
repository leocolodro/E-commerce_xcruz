//@Author: Bautista

/************* Require's ************/
const express = require('express');
const userApiController = require('../../controllers/api/userApiController');
const router = express.Router();
/***********************************/

router.get('/', userApiController.listAll);
router.get('/:id', userApiController.listOne);

module.exports = router;