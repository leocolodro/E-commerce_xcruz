const express = require('express');
const router = express.Router();

const ProductDetailController = require('../controllers/ProductDetailController.js');

router.get('/producto/:id', ProductDetailController.display);

module.exports = router;