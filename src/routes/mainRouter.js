const express = require('express');
const router = express.Router();

const MainController = require('../controllers/mainController.js');

router.get('/', MainController.displayHome);

module.exports = router;