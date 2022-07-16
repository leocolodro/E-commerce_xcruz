//@Author: Bautista

/************* Require's ************/
const express = require('express');
const router = express.Router();
/***********************************/

/************************* Middlewares ****************************/
//adminRoutes
const adminRoutes = require('../middlewares/adminRoutes.js');

//Multer
const productsMulter = require('../middlewares/productsMulter.js')
/*****************************************************************/

/************************* Controller ****************************/
const ProductController = require('../controllers/productController.js');
/*****************************************************************/



/*+++++++++++++++++++++ Products List +++++++++++++++++++++++*/
router.get('/', ProductController.displayAll);
/*+++++++++++++++++++++ Create Product +++++++++++++++++++++++*/
router.get('/nuevo', adminRoutes, ProductController.newProduct);
router.post('/nuevo', adminRoutes, productsMulter().array('agregar-imagen'), ProductController.create);

/*+++++++++++++++++++++ Show Product By ID +++++++++++++++++++++++*/
router.get('/:id', ProductController.display);

/*+++++++++++++++++++++ Edit Product By ID +++++++++++++++++++++++*/
router.get('/:id/editar', adminRoutes, ProductController.editById);
router.put('/:id/editar', adminRoutes, ProductController.edit);

/*+++++++++++++++++++++ Delete Product By ID +++++++++++++++++++++++*/
router.delete('/:id/eliminar', adminRoutes,ProductController.delete)




module.exports = router;