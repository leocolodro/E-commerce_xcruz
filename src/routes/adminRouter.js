const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/adminController.js');

router.get('/nuevo', AdminController.newProduct);
router.get('/editar/:id', AdminController.editById);

module.exports = router;