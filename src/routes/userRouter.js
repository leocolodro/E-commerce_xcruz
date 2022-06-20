const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const multer = require('multer');
const userController = require('../controllers/userController.js');

const { body } = require('express-validator');

//Controllers
const controllersUser = require(path.resolve(__dirname, '../controllers/userController'));

//JSON
let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users-database.json')))

/************* Multer Storage ************/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        //Id for new product -> get products length + 1
        //const newUserId = JsonUsersAnalyzer.read().length + 1;
        
        //Folder path
        //const newFolderPath = path.join(__dirname, '../../public/images/users/user_' + newUserId.toString());
        const newFolderPath = path.join(__dirname, "../../public/images/users/user_test");
        //Crete new folder
        fs.mkdirSync(newFolderPath, { recursive: true })

        cb(null, newFolderPath);
    },
    filename: function (req, file, cb) {
      cb(null, 'profile-pic' + '-' + Date.now()+ path.extname(file.originalname));      
    }
  })

/************* Multer Upload ************/
const upload= multer({ storage })


/*+++++++++++++++++++++ Register Validations+++++++++++++++++++++++*/
const validateRegister = [
    body('firstName')
    .notEmpty().withMessage('Coloca tu nombre!').bail(),

    body('lastName')
    .notEmpty().withMessage('Coloca tu apellido!').bail(),
    
    body('email')
    .notEmpty().withMessage("Coloca tu email!").bail()
    .isEmail().withMessage('Agrega un email válido!'),
  
    //Validate password
    body('password')
    .notEmpty().withMessage("Coloca una contraseña").bail()
    .isLength({min: 6}).withMessage('La contraseña debe contener al menos 6 caractéres'),
      
    //Validate password confirmation
    body('confirm-password')
    .notEmpty().withMessage('Confirma tu contraseña!').bail(),

    //Validate both password and confirmation
    body('confirm-password').custom((value, {req}) => {
      if(req.body.password == value ){
        return true
      }
      else{
        return false 
      }    
      }).withMessage('Las contraseñas deben coincidir'),

        //Select profile-pic
    body('profile-pic').custom((value, {req}) =>{
      if(req.file != undefined){
        return true
      }
      else{
        return false;
      }
      }).withMessage('Debe elegir una foto de perfil!')
    ];

/*+++++++++++++++++++++ Login +++++++++++++++++++++++*/
router.get('/login', userController.displayLogin);

/*+++++++++++++++++++++ Register +++++++++++++++++++++++*/
router.get('/register', userController.displayRegister);
router.post('/register', upload.single('profile-pic'), validateRegister, userController.create);


module.exports = router;