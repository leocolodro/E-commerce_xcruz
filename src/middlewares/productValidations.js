//@Author: Bautista.

//Express Validator - Require
const { body } = require('express-validator');

/*+++++++++++++++++++++ Register Validations+++++++++++++++++++++++*/
const productValidations = [

   //Validate fist name
    body('brandName')
        .notEmpty().withMessage('Coloca un nombre!').bail()
        .isLength({min: 5}).withMessage('El nombre debe contener al menos 5 caractéres'),
    
    body('description')
        .notEmpty().withMessage('Coloca una descripción').bail()
        .isLength({min: 20, max: 500}).withMessage('La descripción debe contener entre 20-500 caractéres')
]

module.exports = productValidations;