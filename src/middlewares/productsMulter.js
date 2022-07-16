//@Author: Bautista

const multer = require('multer');
const path  = require('path');


function productsMulter(req, res, next){


    /************* Multer Storage ************/
    const storage = multer.diskStorage({		
        destination: async (req, file, cb) => {   
            //Folder path
            const productsFolderPath = path.join(__dirname, '../../public/images/products');
        

            cb(null, productsFolderPath);
        },

        filename: (req, file, cb) => {
            //File name with no spaces and all lower cased
            const newFileName = (req.body.brandName + req.body.color + Date.now() + path.extname(file.originalname)).trim().replace(/ +/g,'-').toLowerCase();

            cb(null, newFileName);
        }
    });

    /************* Multer Upload ************/
    return upload = multer({storage: storage});
}
module.exports = productsMulter;