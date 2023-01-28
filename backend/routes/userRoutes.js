const express = require('express');
const { loginController, registerController, getUserData } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router = express.Router();

// ROUTES

// LOGIN || post
router.post('/login', loginController);

// REGISTER || post
router.post('/register', registerController);

// Auth || post
router.get('/getUserData', authMiddleware, getUserData);

module.exports = router;