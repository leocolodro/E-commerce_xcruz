/************* Require's ************/
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path  = require('path');
const JsonProductsAnalyzer = require('../helpers/jsonProductAnalyzer.js');

//Controller
const ProductController = require('../controllers/productController.js');

/************* Multer Storage ************/
const storage = multer.diskStorage({		
    destination: (req, file, cb) => {
        const newProductId = JsonProductsAnalyzer.read().length;

        console.log(newProductId);

        const newFolderPath = path.join(__dirname, '../../public/images/products/producto_x');
        
        

        cb(null, newFolderPath);
    },

    filename: (req, file, cb) => {
        console.log(file);

        const newFileName= req.body.categoria + req.body.color + Date.now();

        cb(null, newFileName);
    }
});

const upload = multer({storage: storage});


/*+++++++++++++++++++++ Create Product +++++++++++++++++++++++*/
router.get('/nuevo', ProductController.newProduct);
router.post('/', upload.single('agregar-imagen'), ProductController.create);

/*+++++++++++++++++++++ Show Product By ID +++++++++++++++++++++++*/
router.get('/:id', ProductController.display);

/*+++++++++++++++++++++ Edit Product By ID +++++++++++++++++++++++*/
router.get('/:id/editar', ProductController.editById);

/*+++++++++++++++++++++ Delete Product By ID +++++++++++++++++++++++*/
router.delete('/:id', ProductController.delete)

module.exports = router;