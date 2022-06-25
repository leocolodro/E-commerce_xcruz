/************* Requieres ************/
const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const multer = require('multer');
const registerValidations = require('../middlewares/registerValidations.js');
const loginValidations = require('../middlewares/loginValidations.js');
const jsonUsersAnalyzer = require('../helpers/jsonUsersAnalyzer.js');
const adminRoutes = require('../middlewares/adminRoutes.js');


/************* Controller ************/
const userController = require('../controllers/userController.js');


/************* Multer Storage ************/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        const newUserId = jsonUsersAnalyzer.read().length + 1;
        
        //Folder path
        const newFolderPath = path.join(__dirname, '../../public/images/users/' + newUserId.toString());

        //Crete new folder
        fs.mkdirSync(newFolderPath, { recursive: true });

        cb(null, newFolderPath);
    },
    filename: function (req, file, cb) {
      cb(null, 'profile-pic' + '-' + Date.now()+ path.extname(file.originalname));      
    }
  })


/************* Multer Upload ************/
const upload = multer({ storage })


/*+++++++++++++++++++ Users List +++++++++++++++++++++*/
router.get('/', adminRoutes, userController.displayUsersList);

/*+++++++++++++++++++++ Login +++++++++++++++++++++++*/
router.get('/login', userController.displayLogin);
router.post('/login', loginValidations, userController.processLogin);

/*+++++++++++++++++++++ Register +++++++++++++++++++++++*/
router.get('/register', userController.displayRegister);
router.post('/register', upload.single('profile-pic'), registerValidations, userController.createUser);


module.exports = router;