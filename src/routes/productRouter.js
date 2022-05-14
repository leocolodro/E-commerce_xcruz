const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController.js');

//Crear Producto
router.get('/nuevo', ProductController.newProduct);

//Mostrar detalles de un producto
router.get('/:id', ProductController.display);

//Editar datos de un producto
router.get('/:id/editar', ProductController.editById);


module.exports = router;