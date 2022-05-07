const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController.js');

router.get('/:id', ProductController.display);
router.get('/nuevo', ProductController.nuevo);
router.get('/editar', ProductController.editar);

module.exports = router;