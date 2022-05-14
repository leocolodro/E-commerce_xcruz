const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');

router.get('/login', userController.displayLogin);

router.get('/register', userController.displayRegister);

module.exports = router;