//@Author: Bautista.

//Express Validator - Require
const { body } = require('express-validator');

/*+++++++++++++++++++++ Login Validations+++++++++++++++++++++++*/
const loginValidations = [
    //Validate email
    body('email')
    .notEmpty().withMessage("Coloca tu email!").bail()
    .isEmail().withMessage('Agrega un email válido!'),

    //Validate password
    body('password')
    .notEmpty().withMessage("Coloca una contraseña").bail()
    .isLength({min: 6}).withMessage('La contraseña debe contener al menos 6 caractéres'),
];

module.exports = loginValidations;