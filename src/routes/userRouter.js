const express = require('express');
const router = express.Router();
const path = require('path');

const bcrypt = require('bcryptjs');
const fs = require('fs');
const multer = require('multer');

const { body } = require('express-validator');

//Controllers
const controllersUser = require(path.resolve(__dirname, '../controllers/userController'));

//JSON
let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users-database.json')))

//Guardado de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/users'));    //Guardar imagen en '../../public/images/usuarios'
    },
    filename: function (req, file, cb) {
      cb(null, 'foto' + '-' + Date.now()+ path.extname(file.originalname));      
    }
  })

const upload= multer({ storage })

//Validaciones del Registro
const validacionesRegistro = [
    body('first_name').isLength({
          min: 1
        }).withMessage('El campo nombre no puede estar vacío'),
      body('last_name').isLength({min: 1
        }).withMessage('El campo apellido no puede estar vacío'),
      body('email').isEmail().withMessage('Agregar un email válido'),
  
      //Valida la password 
      body('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres'),
      
      //Valido la confimacion de la password dispuesto por el usuario
      body('confirm_password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),

      //Validar si las contraseñas son validas
      
      body('confirm_password').custom((value, {req}) =>{
          if(req.body.password == value ){
              return true    // Si yo retorno un true  no se muestra el error     
          }else{
              return false   // Si retorno un false si se muestra el error
          }    
      }).withMessage('Las contraseñas deben ser iguales'),

        //Seleccionar un avatar  
      body('avatar').custom((value, {req}) =>{
          if(req.file != undefined){
              return true
          }
          return false;
      }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG')
    ]


const userController = require('../controllers/userController.js');

router.get('/login', userController.displayLogin);

router.get('/register', userController.displayRegister);

//En esta ruta envio al controlador el avatar del usuario asi como las validaciones
router.post('/register', upload.single('avatar'),validacionesRegistro, userController.create);


module.exports = router;