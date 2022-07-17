//@Author: Bautista

const multer = require('multer');
const path  = require('path');

function usersMulter (req, res, next){
    
    /************* Multer Storage ************/
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        
            //Folder path
            const folderPath = path.join(__dirname, '../../public/images/users');


            cb(null, folderPath);
        },
        filename: function (req, file, cb) {
        (null, 'profile-pic' + '-' + Date.now()+ path.extname(file.originalname));      
        }
    });

    /************* Multer Upload ************/
    return upload = multer({ storage })
}

module.exports = usersMulter;