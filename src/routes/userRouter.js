
/************* Requieres ************/
const express = require('express');
const router = express.Router();
const registerValidations = require('../middlewares/registerValidations.js');
const loginValidations = require('../middlewares/loginValidations.js');

/************* Middlewares Requieres ************/
const usersMulter = require('../middlewares/usersMulter');
const adminRoutes = require('../middlewares/adminRoutes.js');
const userDetailAuthorization = require('../middlewares/userDetailAuthorization.js');
const loginRegisterCancelation = require('../middlewares/loginRegisterCancelation.js');


/************* Controller ************/
const userController = require('../controllers/userController.js');




/*+++++++++++++++++++ Users List +++++++++++++++++++++*/
router.get('/', adminRoutes, userController.displayUsersList);

/*+++++++++++++++++++++ Login +++++++++++++++++++++++*/
router.get('/login', loginRegisterCancelation,userController.displayLogin);
router.post('/login', loginValidations, userController.processLogin);

/*+++++++++++++++++++++ Register +++++++++++++++++++++++*/
router.get('/register', loginRegisterCancelation, userController.displayRegister);
router.post('/register', usersMulter().single('profile-pic'), registerValidations, userController.createUser);

/*+++++++++++++++++++++ Profile +++++++++++++++++++++++*/
router.get('/profile', userController.displayProfile);

/*+++++++++++++++++++++ Show User By ID +++++++++++++++++++++++*/
router.get('/:id', userDetailAuthorization, userController.displayUser);
router.put('/:id/editar', usersMulter().single('profile-pic'), userController.editUser);
router.delete('/:id/eliminar', adminRoutes ,userController.deleteUser);

module.exports = router;