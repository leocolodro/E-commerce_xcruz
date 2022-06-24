const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController.js');
const userAuthorizationChecker = require('../middlewares/userAuthorizationChecker.js');


router.get('/', userAuthorizationChecker, cartController.display);

module.exports = router;