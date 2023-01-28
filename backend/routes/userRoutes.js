const express = require('express');
const { loginController, registerController } = require('../controllers/userController')

// router object
const router = express.Router();

// ROUTES

// LOGIN || post
router.post('/login', loginController);

// REGISTER || post
router.post('/register', registerController);

module.exports = router;