const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController.js');

router.get('/', loginController.display);

module.exports = router;