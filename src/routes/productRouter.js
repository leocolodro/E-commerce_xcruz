//Author: Bautista.

/************* Require's ************/
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path  = require('path');
const JsonProductsAnalyzer = require('../helpers/jsonProductAnalyzer.js');

//Controller
const ProductController = require('../controllers/productController.js');

/************* Multer Storage ************/
const storage = multer.diskStorage({		
    destination: (req, file, cb) => {
        
        //Id for new product -> get products length + 1
        const newProductId = JsonProductsAnalyzer.read().length + 1;
        
        //Folder path
        const newFolderPath = path.join(__dirname, '../../public/images/products/producto_' + newProductId.toString());
        
        //Crete new folder
        fs.mkdirSync(newFolderPath, { recursive: true })

        cb(null, newFolderPath);
    },

    filename: (req, file, cb) => {
        //File name with no spaces and all lower cased
        const newFileName = (req.body.categoria + req.body.color + Date.now() + path.extname(file.originalname)).trim().replace(/ +/g,'-').toLowerCase();

        cb(null, newFileName);
    }
});

/************* Multer Upload ************/
const upload = multer({storage: storage})

/*+++++++++++++++++++++ Products List +++++++++++++++++++++++*/
router.get('/', ProductController.displayAll);
/*+++++++++++++++++++++ Create Product +++++++++++++++++++++++*/
router.get('/nuevo', ProductController.newProduct);
router.post('/nuevo', upload.array('agregar-imagen'), ProductController.create);

/*+++++++++++++++++++++ Show Product By ID +++++++++++++++++++++++*/
router.get('/:id', ProductController.display);

/*+++++++++++++++++++++ Edit Product By ID +++++++++++++++++++++++*/
router.get('/:id/editar', ProductController.editById);
router.put('/:id/editar', ProductController.edit);

/*+++++++++++++++++++++ Delete Product By ID +++++++++++++++++++++++*/
router.delete('/:id/eliminar', ProductController.delete)

module.exports = router;