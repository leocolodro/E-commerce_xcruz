//@Author: Bautista.

//Express Validator - Require
const { body } = require('express-validator');

/*+++++++++++++++++++++ Register Validations+++++++++++++++++++++++*/
const registerValidations = [

   //Validate fist name
    body('firstName')
    .notEmpty().withMessage('Coloca tu nombre!').bail()
    .isLength({min: 2}).withMessage('El nombre debe contener al menos 2 caractéres'),
    
    //Validate last name
    body('lastName')
    .notEmpty().withMessage('Coloca tu apellido!').bail(),

    //Validate phone number
    body('telephone')
    .notEmpty().withMessage("Coloca un número de teléfono!").bail()
    .isNumeric({min: 8}).withMessage("Coloca un número de teléfono valido!"),

    //Validate email
    body('email')
    .notEmpty().withMessage("Coloca tu email!").bail()
    .isEmail().withMessage('Agrega un email válido!').bail(),
  
    //Validate password
    body('password')
    .notEmpty().withMessage("Coloca una contraseña").bail()
    .isLength({min: 8}).withMessage('La contraseña debe contener al menos 8 caractéres').bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("La contraseña debe tener al menos una letra mayúscula, una minúscula y un caracter especial (!\"#$%&\'()*+,-./)"),
      
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

      body('securityAnswer')
      .notEmpty().withMessage("Coloca una respuesta!").bail()
      .isLength({max: 35}).withMessage("La respuesta no debe superar los 35 caracteres!"),
  ]


module.exports = registerValidations