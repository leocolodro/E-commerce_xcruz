const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController.js');

router.get('/', ProductController.listadoDeProductos)

router.get('/:id', ProductController.display);


router.post('/nuevo', ProductController.guardarProducto)

router.put('/:id/editar', ProductController.editar);

router.delete('/:id/borrar', ProductController.borrar)

module.exports = router;