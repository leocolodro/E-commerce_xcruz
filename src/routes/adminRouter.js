const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/adminController.js');

router.get('/nuevo', AdminController.nuevo);
router.get('/editar', AdminController.editar);

module.exports = router;